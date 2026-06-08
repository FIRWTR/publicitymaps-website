import { NextRequest, NextResponse } from "next/server";

const UA = "PublicityMaps/1.0 (contact@publicitymaps.com)";

// ── Nominatim geocoding (OpenStreetMap, free, no key) ─────────────────────────
async function geocodeAddress(address: string) {
  const url =
    "https://nominatim.openstreetmap.org/search?" +
    new URLSearchParams({ q: address, format: "json", limit: "1", "accept-language": "en" });
  const res = await fetch(url, {
    headers: { "User-Agent": UA },
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error("Geocoding service unavailable");
  const data = await res.json();
  if (!data.length) throw new Error("Address not found. Try adding city and state.");
  const parts = (data[0].display_name as string).split(",");
  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
    displayName: data[0].display_name as string,
    shortName: parts.slice(0, 3).join(",").trim(),
  };
}

// ── Census Geocoder → FIPS codes (free, no key) ───────────────────────────────
async function getCensusFIPS(lat: number, lng: number) {
  try {
    const url =
      "https://geocoding.geo.census.gov/geocoder/geographies/coordinates?" +
      new URLSearchParams({
        x: String(lng), y: String(lat),
        benchmark: "4", vintage: "4", layers: "8,10", format: "json",
      });
    const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(10000) });
    const data = await res.json();
    const tracts = data?.result?.geographies?.["Census Tracts"];
    if (!tracts?.length) return null;
    const t = tracts[0];
    return { state: t.STATE as string, county: t.COUNTY as string, tract: t.TRACT as string };
  } catch { return null; }
}

// ── Census ACS 5-year estimates (free, no key) ────────────────────────────────
async function getCensusACS(state: string, county: string, tract: string) {
  try {
    const vars = "B19013_001E,B25003_001E,B25003_002E,B01003_001E,B25077_001E";
    const url =
      `https://api.census.gov/data/2022/acs/acs5?get=NAME,${vars}` +
      `&for=tract:${tract}&in=state:${state}%20county:${county}`;
    const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(10000) });
    const data: string[][] = await res.json();
    if (!Array.isArray(data) || data.length < 2) return null;
    const [header, values] = data;
    const n = (key: string) => { const v = parseInt(values[header.indexOf(key)]); return (isNaN(v) || v < 0) ? 0 : v; };
    const totalHousing = n("B25003_001E");
    const ownerOccupied = n("B25003_002E");
    return {
      medianIncome:      n("B19013_001E"),
      totalHousing,
      ownerOccupied,
      homeownershipRate: totalHousing > 0 ? Math.round((ownerOccupied / totalHousing) * 100) : 0,
      population:        n("B01003_001E"),
      medianHomeValue:   n("B25077_001E"),
      tractName:         values[header.indexOf("NAME")] ?? "",
    };
  } catch { return null; }
}

// ── Overpass API — OSM road network + business count (free, no key) ───────────
async function getOverpassData(lat: number, lng: number, radiusMeters: number) {
  const t = radiusMeters > 12000 ? 50 : 30;

  const roadQ = `
[out:json][timeout:${t}];
(
  way["highway"~"^(motorway|motorway_link|trunk|trunk_link|primary|secondary|tertiary)$"](around:${radiusMeters},${lat},${lng});
);
out tags;`;

  const bizQ = `
[out:json][timeout:${t}];
(
  node["shop"](around:${radiusMeters},${lat},${lng});
  node["amenity"~"restaurant|cafe|bank|fuel|supermarket|pharmacy|fast_food"](around:${radiusMeters},${lat},${lng});
  way["shop"](around:${radiusMeters},${lat},${lng});
);
out count;`;

  try {
    const post = (q: string) =>
      fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `data=${encodeURIComponent(q)}`,
        cache: "no-store",
        signal: AbortSignal.timeout((t + 10) * 1000),
      });

    const [roadRes, bizRes] = await Promise.all([post(roadQ), post(bizQ)]);
    const [roadData, bizData] = await Promise.all([roadRes.json(), bizRes.json()]);

    const ways: { tags?: Record<string, string> }[] = roadData.elements ?? [];
    let motorways = 0, trunks = 0, primaries = 0, secondaries = 0, tertiaries = 0;
    const seenNames = new Set<string>();
    const namedRoads: string[] = [];

    for (const w of ways) {
      const hw = w.tags?.highway ?? "";
      if (hw === "motorway" || hw === "motorway_link") motorways++;
      else if (hw === "trunk" || hw === "trunk_link") trunks++;
      else if (hw === "primary") primaries++;
      else if (hw === "secondary") secondaries++;
      else if (hw === "tertiary") tertiaries++;

      const nm = w.tags?.name ?? w.tags?.ref ?? "";
      if (nm && !seenNames.has(nm) && namedRoads.length < 12) {
        seenNames.add(nm);
        namedRoads.push(nm);
      }
    }

    const businessCount = parseInt(bizData.elements?.[0]?.tags?.total ?? "0") || 0;
    return { motorways, trunks, primaries, secondaries, tertiaries, namedRoads, businessCount };
  } catch {
    return { motorways: 0, trunks: 0, primaries: 0, secondaries: 0, tertiaries: 0, namedRoads: [], businessCount: 0 };
  }
}

// ── Business-type intelligence config ────────────────────────────────────────
const BIZ_CONFIG: Record<string, {
  label: string;
  weights: { traffic: number; income: number; homeownership: number; activity: number };
  incomeMin: number;      // income below this = low score
  incomeIdeal: number;    // income at/above this = 100
  homeMin: number;        // homeownership % below this = low score
  homeIdeal: number;      // homeownership % at/above this = 100
  urbanBonus: boolean;    // true = lower homeownership can be a positive signal
  topFactor: string;
  idealCustomer: string;
  signStrategy: string;
}> = {
  landscaping: {
    label: "Landscaping",
    weights: { traffic: 0.18, income: 0.27, homeownership: 0.42, activity: 0.13 },
    incomeMin: 42000, incomeIdeal: 80000,
    homeMin: 55, homeIdeal: 78,
    urbanBonus: false,
    topFactor: "Homeownership",
    idealCustomer: "Homeowners with maintained yards who budget for recurring lawn and landscaping services.",
    signStrategy: "Residential yard sign saturation — homeowners trust neighbor referrals more than any ad.",
  },
  roofing: {
    label: "Roofing",
    weights: { traffic: 0.22, income: 0.13, homeownership: 0.50, activity: 0.15 },
    incomeMin: 35000, incomeIdeal: 65000,
    homeMin: 60, homeIdeal: 82,
    urbanBonus: false,
    topFactor: "Homeownership",
    idealCustomer: "Homeowners of all income levels — every home needs a roof, and storm damage is income-blind.",
    signStrategy: "High-visibility corridor banners near dense residential areas, especially post-storm surge timing.",
  },
  restoration: {
    label: "Restoration",
    weights: { traffic: 0.28, income: 0.22, homeownership: 0.38, activity: 0.12 },
    incomeMin: 45000, incomeIdeal: 78000,
    homeMin: 52, homeIdeal: 72,
    urbanBonus: false,
    topFactor: "Homeownership",
    idealCustomer: "Homeowners with insurance — higher-income homeowners carry better coverage and approve larger restoration jobs.",
    signStrategy: "Emergency-visible highway and arterial presence plus established residential yard signs for trust building.",
  },
  coffee: {
    label: "Coffee / Café",
    weights: { traffic: 0.52, income: 0.26, homeownership: 0.08, activity: 0.14 },
    incomeMin: 35000, incomeIdeal: 72000,
    homeMin: 0, homeIdeal: 45,
    urbanBonus: true,
    topFactor: "Traffic",
    idealCustomer: "Commuters and daily coffee drinkers — traffic volume and disposable income matter far more than homeownership.",
    signStrategy: "Directional A-frames within 0.5 miles, high-visibility placement on morning commute corridors.",
  },
  events: {
    label: "Events",
    weights: { traffic: 0.42, income: 0.32, homeownership: 0.12, activity: 0.14 },
    incomeMin: 48000, incomeIdeal: 85000,
    homeMin: 0, homeIdeal: 55,
    urbanBonus: false,
    topFactor: "Income + Traffic",
    idealCustomer: "Households with discretionary income to spend on entertainment and events — income is the primary filter.",
    signStrategy: "Temporary banners on high-traffic roads 2–4 weeks before events; directional signs at key decision points.",
  },
  political: {
    label: "Political",
    weights: { traffic: 0.18, income: 0.08, homeownership: 0.60, activity: 0.14 },
    incomeMin: 0, incomeIdeal: 60000,
    homeMin: 58, homeIdeal: 80,
    urbanBonus: false,
    topFactor: "Homeownership",
    idealCustomer: "Registered voters — homeowners display yard signs and engage more deeply with local politics.",
    signStrategy: "Dense residential yard sign saturation in high-homeownership corridors; arterial intersections for name recognition.",
  },
  general: {
    label: "General / Other",
    weights: { traffic: 0.35, income: 0.25, homeownership: 0.25, activity: 0.15 },
    incomeMin: 38000, incomeIdeal: 72000,
    homeMin: 45, homeIdeal: 68,
    urbanBonus: false,
    topFactor: "Traffic",
    idealCustomer: "General local market — balanced mix of commuters and residents.",
    signStrategy: "Mixed strategy: arterial banners for broad awareness, residential signs for targeted neighborhoods.",
  },
};

// ── Analysis engine ───────────────────────────────────────────────────────────
type Demo = Awaited<ReturnType<typeof getCensusACS>>;
type Roads = { motorways: number; trunks: number; primaries: number; secondaries: number; tertiaries: number; namedRoads: string[]; businessCount: number };

function buildAnalysis(demo: Demo, roads: Roads, radiusMiles: number, bizType: string) {
  const cfg = BIZ_CONFIG[bizType] ?? BIZ_CONFIG.general;
  const { motorways, trunks, primaries, secondaries, tertiaries, namedRoads, businessCount } = roads;
  const hwFiltered = namedRoads.filter(n => /^(I-|US |SR-|State|Highway|Hwy)/i.test(n)).slice(0, 3);
  const hw = hwFiltered.length > 0 ? hwFiltered : namedRoads.slice(0, 2);

  // ── Traffic score — cap per road type to avoid OSM segment inflation ──────
  // 1 physical highway = many OSM way segments; capping prevents false highs
  const trafficScore = Math.min(100, Math.round(
    Math.min(motorways + trunks, 5) * 18 +
    Math.min(primaries, 6) * 9 +
    Math.min(secondaries, 10) * 4 +
    Math.min(tertiaries, 20) * 1.5
  ));

  // ── Income score — scaled to business-specific thresholds ─────────────────
  let incomeScore = 50;
  if (demo && demo.medianIncome > 0) {
    if (demo.medianIncome >= cfg.incomeIdeal) incomeScore = 100;
    else if (demo.medianIncome <= cfg.incomeMin) incomeScore = 15;
    else incomeScore = 15 + Math.round(((demo.medianIncome - cfg.incomeMin) / (cfg.incomeIdeal - cfg.incomeMin)) * 85);
  }

  // ── Homeownership score — scaled to business-specific thresholds ──────────
  let homeScore = 50;
  if (demo) {
    const rate = demo.homeownershipRate;
    if (rate >= cfg.homeIdeal) homeScore = 100;
    else if (rate <= cfg.homeMin) homeScore = cfg.urbanBonus ? 80 : 10; // urban biz OK with low ownership
    else homeScore = 10 + Math.round(((rate - cfg.homeMin) / (cfg.homeIdeal - cfg.homeMin)) * 90);
    // Coffee shops: low homeownership = urban density = bonus
    if (cfg.urbanBonus && rate < 45) homeScore = Math.min(100, homeScore + 20);
  }

  // ── Market activity score ─────────────────────────────────────────────────
  const area = Math.PI * radiusMiles * radiusMiles;
  const density = businessCount / Math.max(1, area);
  const activityScore = Math.min(100, Math.round(density * 10));

  // ── Overall — weighted by business type ───────────────────────────────────
  const w = cfg.weights;
  const overall = Math.round(
    trafficScore * w.traffic + incomeScore * w.income + homeScore * w.homeownership + activityScore * w.activity
  );
  const tier = overall >= 78 ? "Excellent" : overall >= 58 ? "Good" : overall >= 38 ? "Fair" : "Limited";

  // ── Business-specific recommendations ────────────────────────────────────
  const recs: { priority: string; title: string; detail: string; signType: string }[] = [];

  // --- LANDSCAPING ---
  if (bizType === "landscaping") {
    if (demo && demo.homeownershipRate >= 65) recs.push({
      priority: "High", title: "Yard sign saturation — this is landscaping territory",
      detail: `${demo.homeownershipRate}% homeownership means most residents have a yard to maintain. A dense yard sign campaign in active corridors works here because homeowners see their neighbors' signs every time they come home. Target streets with well-maintained curb appeal — those homeowners already value landscaping.`,
      signType: "18×24 or 24×36 corrugated yard signs, 1 per block minimum in core corridors",
    });
    if (demo && demo.medianIncome >= 70000) recs.push({
      priority: "High", title: "Recurring service market — income supports monthly contracts",
      detail: `Median income $${demo.medianIncome.toLocaleString()} supports recurring lawn care and landscaping contracts ($150–400/month). Position signs around "maintenance plans" and "seasonal packages" rather than one-time jobs. This demographic hires and keeps service providers.`,
      signType: "Premium-finish aluminum signs with service package call-to-action",
    });
    if (motorways > 0 || primaries >= 2) recs.push({
      priority: "Medium", title: "Highway/arterial visibility for brand building",
      detail: `${motorways + trunks + primaries} major road(s) in this area. Highway and arterial banners build brand name recognition but rarely generate direct landscaping calls — homeowners hire landscapers from yard signs and referrals, not commuter billboards. Use road visibility for name familiarity, residential signs for conversions.`,
      signType: "4×8 banner on high-traffic road for brand; yard signs for lead generation",
    });
    if (demo && demo.homeownershipRate < 50) recs.push({
      priority: "Low", title: "Low homeownership — limited landscaping market",
      detail: `${demo.homeownershipRate}% homeownership is below the threshold for residential landscaping marketing. Renters don't hire landscapers. Consider analyzing a larger radius or a nearby corridor with higher owner-occupancy.`,
      signType: "Shift focus to commercial property maintenance messaging",
    });
  }

  // --- ROOFING ---
  else if (bizType === "roofing") {
    if (demo && demo.homeownershipRate >= 62) recs.push({
      priority: "High", title: `${demo.homeownershipRate}% homeowners — every one is a future customer`,
      detail: `All homeowners need roof maintenance or replacement eventually — the only question is timing. A high-visibility presence in this corridor ensures you're the first name they think of when the time comes. Roofing leads most often come from the owner seeing a sign in their own neighborhood after a storm or when they notice wear.`,
      signType: "24×36 yard signs with strong brand and phone number — keep it simple",
    });
    if (motorways > 0 || trunks > 0) recs.push({
      priority: "High", title: "Highway banners — especially valuable post-storm",
      detail: `${motorways + trunks} major highway corridor(s)${hw.length ? ` (${hw.join(", ")})` : ""}. Highway banners for roofing are uniquely valuable immediately after a hail or wind event — homeowners driving home through storm damage are actively looking for roofers. A permanent banner here captures that seasonal surge every single time.`,
      signType: "4×8 or 4×12 ft banner at highway approach — permanent placement is worth the cost",
    });
    if (demo && demo.medianIncome < 60000) recs.push({
      priority: "Medium", title: "Value market — lead with insurance and financing",
      detail: `Median income $${demo.medianIncome.toLocaleString()} — signs should lead with "We Work With Insurance" and "0% Financing Available." These homeowners need roofs but are cost-conscious. Removing the financial barrier in your messaging converts significantly better than brand-only signs.`,
      signType: "Yard signs with insurance/financing headline above company name",
    });
    if (primaries >= 1) recs.push({
      priority: "Medium", title: "Arterial road placements for commuter awareness",
      detail: `${primaries} primary arterial road(s) carry daily commuters who live in this area. Consistent arterial placement means homeowners in this corridor see your brand weekly — building the familiarity that leads to a call when their roof needs attention.`,
      signType: "A-frame signs at major intersections, yard signs on arterial-adjacent residential streets",
    });
  }

  // --- RESTORATION ---
  else if (bizType === "restoration") {
    if (motorways > 0 || trunks > 0 || primaries >= 2) recs.push({
      priority: "High", title: "Emergency corridor visibility — critical for restoration",
      detail: `${motorways + trunks + primaries} high-traffic road(s) in this area${hw.length ? ` including ${hw.join(", ")}` : ""}. Restoration companies depend on being visible when disaster strikes — after a flood, fire, or major storm, homeowners driving through affected areas are actively looking for help. Permanent signs on major corridors ensure you're visible at exactly that moment.`,
      signType: "Large-format banners on primary corridors, 24/7 phone number prominently displayed",
    });
    if (demo && demo.homeownershipRate >= 58) recs.push({
      priority: "High", title: "Homeowner-dense area — insurance claim territory",
      detail: `${demo.homeownershipRate}% homeownership and${demo ? ` median home value $${demo.medianHomeValue > 0 ? demo.medianHomeValue.toLocaleString() : "N/A"}` : ""} — homeowners in this range carry property insurance that covers restoration work. The call-to-action should emphasize "We Handle Insurance Directly" — this removes the biggest barrier to a homeowner calling.`,
      signType: "Yard signs with insurance claim messaging, A-frames post-storm event",
    });
    if (demo && demo.medianIncome >= 72000) recs.push({
      priority: "Medium", title: "Higher-income market — premium restoration scope",
      detail: `Median income $${demo.medianIncome.toLocaleString()} correlates with better insurance coverage and larger approved restoration budgets. Homeowners here are more likely to approve comprehensive remediation rather than minimal patchwork. Signs in this area should convey professionalism and full-service capability.`,
      signType: "Premium aluminum signs — perceived quality matters when homeowners choose a restoration company",
    });
  }

  // --- COFFEE ---
  else if (bizType === "coffee") {
    if (motorways > 0 || trunks > 0 || primaries >= 2) recs.push({
      priority: "High", title: "Morning commute corridor — coffee shop goldmine",
      detail: `${motorways + trunks + primaries} major road(s)${hw.length ? ` (${hw.join(", ")})` : ""} carry commuters directly past your area. Directional signs placed on commute routes capture habitual morning traffic. Coffee purchasing is one of the most routinized behaviors — people don't discover new coffee shops, they stumble onto them during their regular route.`,
      signType: "A-frame directional signs within 0.3 miles on commute approach, arrow pointing toward location",
    });
    if (activityScore >= 35) recs.push({
      priority: "High", title: "Commercial activity — foot traffic already exists",
      detail: `${businessCount} businesses nearby creates a commercial ecosystem with built-in foot traffic. Co-locate awareness with retail clusters — people running errands are prime coffee customers. A-frames positioned near parking lots or shopping center entrances capture the highest-conversion moment.`,
      signType: "A-frames near parking areas and retail entrances, window signage if storefront",
    });
    if (cfg.urbanBonus && demo && demo.homeownershipRate < 50) recs.push({
      priority: "Medium", title: "Urban character — strong coffee culture fit",
      detail: `${demo.homeownershipRate}% homeownership indicates a denser, more urban character — which is a positive signal for coffee shops. Urban renters spend more on coffee per capita than suburban homeowners. This area likely has the walkability and density that supports a coffee shop's daily customer base.`,
      signType: "Pedestrian-level A-frames and window signage in addition to vehicular signage",
    });
    if (demo && demo.medianIncome < 45000) recs.push({
      priority: "Low", title: "Budget-conscious market — value positioning",
      detail: `Median income $${demo.medianIncome.toLocaleString()} — signs should emphasize value: daily deals, loyalty rewards, or an accessible price point. Competing on premium/artisan positioning is harder in lower-income corridors.`,
      signType: "Signs with price point or deal visible ('$3 lattes, 6am–11am')",
    });
  }

  // --- EVENTS ---
  else if (bizType === "events") {
    if (motorways > 0 || trunks > 0 || primaries >= 2) recs.push({
      priority: "High", title: "High-traffic corridor — event awareness reach",
      detail: `${motorways + trunks + primaries} major road(s)${hw.length ? ` (${hw.join(", ")})` : ""}. Event marketing is uniquely time-sensitive — a banner placed 2–4 weeks before an event on a high-traffic road can generate thousands of impressions per day from people who live in the area. Start sign placement earlier than feels necessary; awareness builds cumulatively.`,
      signType: "4×8 banners on arterials 3–4 weeks out; A-frame directional signs event week",
    });
    if (demo && demo.medianIncome >= 65000) recs.push({
      priority: "High", title: "Disposable income bracket — strong event attendance potential",
      detail: `Median income $${demo.medianIncome.toLocaleString()} — households in this range have discretionary income for entertainment, dining, and events. Signs that clearly communicate the event value (date, what it is, why it's worth going) outperform brand-only designs with this audience.`,
      signType: "Full-color event banners with date, name, and one compelling visual — no clutter",
    });
    if (businessCount > 20) recs.push({
      priority: "Medium", title: "Commercial area — co-promote with nearby businesses",
      detail: `${businessCount} businesses in radius. Events benefit enormously from co-promotional sign placement at businesses that share your audience. A restaurant, venue, or retail shop that serves your demographic is a high-value sign host — their existing customers become your awareness pool.`,
      signType: "Window signs or A-frames placed with partner businesses",
    });
  }

  // --- POLITICAL ---
  else if (bizType === "political") {
    if (demo && demo.homeownershipRate >= 60) recs.push({
      priority: "High", title: `${demo.homeownershipRate}% homeownership — your primary yard sign audience`,
      detail: `Homeowners are the backbone of yard sign campaigns. They control the property, have higher voter turnout, and are more engaged with local issues. In a ${demo.homeownershipRate}% homeowner area, a focused door-to-door yard sign request campaign is often more effective than any other political marketing tactic. Every sign you place is also an implicit neighbor endorsement.`,
      signType: "18×24 corrugated yard signs — prioritize density over geographic spread",
    });
    if (motorways > 0 || primaries >= 2) recs.push({
      priority: "High", title: "High-traffic intersections — name recognition at scale",
      detail: `${motorways + primaries} major road(s)${hw.length ? ` (${hw.join(", ")})` : ""}. Large intersection banners build name ID with voters who may never walk their neighborhood but see your sign at the same light every morning. Name recognition translates directly to downballot and low-information votes. Secure major intersections as early as permitted.`,
      signType: "4×4 or 4×8 banners at high-traffic intersections, larger format for name-ID priority",
    });
    if (secondaries + tertiaries > 10) recs.push({
      priority: "Medium", title: "Local road density — street-level saturation opportunity",
      detail: `Dense local road network means voters travel these streets daily. A saturation approach — placing yard signs on every residential block — creates a perception of broad community support that reinforces voter confidence in a candidate. Political psychology research consistently shows voters want to back a winner; visible sign density signals momentum.`,
      signType: "18×24 yard signs on all accessible residential corridors within the radius",
    });
    if (demo && demo.homeownershipRate < 50) recs.push({
      priority: "Low", title: "Renter-dominant area — lower yard sign placement potential",
      detail: `${demo.homeownershipRate}% homeownership limits yard sign hosts. Renters can't place signs without landlord permission. Shift tactics toward apartment complex entry signage (where permitted), high-traffic pedestrian areas, and public-right-of-way locations where your local ordinances allow.`,
      signType: "Apartment complex entrance signs (with permission), public right-of-way placements per local rules",
    });
  }

  // --- GENERAL fallback ---
  else {
    if (motorways > 0 || trunks > 0) recs.push({
      priority: "High", title: "Highway corridor banners",
      detail: `${motorways + trunks} major highway corridor(s)${hw.length ? ` (${hw.join(", ")})` : ""}. Large-format banners at on/off ramp approach zones generate thousands of daily impressions — the highest per-dollar reach available in physical advertising.`,
      signType: "4×8 ft or 4×12 ft banners at highway approach zones",
    });
    if (primaries >= 2) recs.push({
      priority: "High", title: "Arterial intersection placements",
      detail: `${primaries} primary arterial road(s). Signalized intersections on these corridors provide extended dwell time — ideal for A-frame signs during business hours.`,
      signType: "A-frame signs at signalized intersections, corner property banners",
    });
    if (demo && demo.homeownershipRate > 58) recs.push({
      priority: "Medium", title: "Residential yard sign campaign",
      detail: `${demo.homeownershipRate}% homeownership supports residential sign saturation. Neighbor-to-neighbor visibility is the highest-trust channel in physical advertising.`,
      signType: "18×24 or 24×36 corrugated yard signs",
    });
  }

  // ── Fallback: ensure recs exist when demographics unavailable ────────────
  if (recs.length === 0) {
    if (namedRoads.length > 0 || motorways + trunks + primaries > 0) {
      recs.push({
        priority: "Medium",
        title: "Road network found — place for maximum visibility",
        detail: `${namedRoads.slice(0, 3).join(", ")}${namedRoads.length > 0 ? " and " : ""}${secondaries + tertiaries} local roads identified in this area. Demographic scoring is available for US addresses; road-based placement opportunities are shown here.`,
        signType: "High-traffic road banners and intersection A-frames",
      });
    } else {
      recs.push({
        priority: "Medium",
        title: "Try a larger radius for more data",
        detail: "Limited road and business data found at this radius. Increase to 3–5 miles or enter a more specific address for richer placement recommendations.",
        signType: "Standard corrugated yard signs as a starting point",
      });
    }
  }

  // ── Universal insight: competition / timing ───────────────────────────────
  if (businessCount > 30 && recs.length < 5) recs.push({
    priority: "Medium", title: "Active commercial zone — secure prime spots first",
    detail: `${businessCount} businesses in radius signals an active market. High-visibility locations will be contested. Identify the top 3 intersections by traffic and secure them before competitors.`,
    signType: "Largest practical format at your 3 most visible locations",
  });
  if (businessCount < 10 && recs.length < 5) recs.push({
    priority: "Low", title: "Low competition — early-mover advantage",
    detail: `Only ${businessCount} businesses in this radius. Any sign placement will stand out with minimal visual competition. This is an opportunity to establish brand presence at low cost before the area grows.`,
    signType: "Standard corrugated or aluminum signs — no need to overinvest in a low-competition zone",
  });

  // ── Key insights ─────────────────────────────────────────────────────────
  const insights: string[] = [];
  if (namedRoads.length > 0) insights.push(`Roads identified: ${namedRoads.slice(0, 7).join(" · ")}`);
  if (demo?.population) insights.push(`Census tract population: ${demo.population.toLocaleString()}`);
  if (demo?.medianHomeValue && demo.medianHomeValue > 0) insights.push(`Median home value: $${demo.medianHomeValue.toLocaleString()}`);
  if (businessCount) insights.push(`${businessCount} commercial businesses within ${radiusMiles} mi`);
  if (demo?.homeownershipRate) insights.push(`Homeownership rate: ${demo.homeownershipRate}%`);
  if (demo?.medianIncome) insights.push(`Median household income: $${demo.medianIncome.toLocaleString()}`);

  // ── Summary — specific to business type ──────────────────────────────────
  const bizLabel = cfg.label;
  const summary =
    overall >= 78
      ? `Strong ${bizLabel} market. ${tier} opportunity — the demographics and road network in this area align well with your ideal customer profile.`
      : overall >= 58
      ? `Solid ${bizLabel} opportunity. Good fundamentals — focus on the highest-priority recommendations below to maximize your sign placement ROI.`
      : overall >= 38
      ? `Moderate ${bizLabel} market. This area has some opportunity but strategic placement matters more than saturation here.`
      : `Limited ${bizLabel} fit in this immediate radius. The demographics don't strongly match your ideal customer. Try a larger radius or a nearby area.`;

  return {
    overallScore: overall,
    tier,
    summary,
    scores: { traffic: trafficScore, income: incomeScore, homeownership: homeScore, activity: activityScore },
    recommendations: recs.slice(0, 5),
    keyInsights: insights,
    bizProfile: {
      label: cfg.label,
      topFactor: cfg.topFactor,
      idealCustomer: cfg.idealCustomer,
      signStrategy: cfg.signStrategy,
    },
  };
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { address, radiusMiles, bizType } = await req.json() as {
      address: string; radiusMiles: number; bizType: string;
    };

    if (!address?.trim()) return NextResponse.json({ error: "Address is required" }, { status: 400 });

    const radiusMeters = Math.round(radiusMiles * 1609.34);

    // 1. Geocode
    const geo = await geocodeAddress(address.trim());

    // 2. FIPS + Overpass in parallel
    const [fips, overpass] = await Promise.all([
      getCensusFIPS(geo.lat, geo.lng),
      getOverpassData(geo.lat, geo.lng, radiusMeters),
    ]);

    // 3. ACS demographics (only if US address found)
    const demo = fips ? await getCensusACS(fips.state, fips.county, fips.tract) : null;

    // 4. Build analysis
    const analysis = buildAnalysis(demo, overpass, radiusMiles, bizType);

    return NextResponse.json({
      success: true,
      location: { lat: geo.lat, lng: geo.lng, displayName: geo.displayName, shortName: geo.shortName },
      demographics: demo,
      roads: {
        motorways: overpass.motorways, trunks: overpass.trunks,
        primaries: overpass.primaries, secondaries: overpass.secondaries,
        tertiaries: overpass.tertiaries, namedRoads: overpass.namedRoads,
      },
      businessCount: overpass.businessCount,
      radiusMeters,
      radiusMiles,
      analysis,
      hasDemographics: demo !== null,
    });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Analysis failed";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
