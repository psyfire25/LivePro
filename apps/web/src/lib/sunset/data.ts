export interface SunsetSpot {
  id: string;
  name: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  rating: number;
  elevationMeters: number;
  idealAzimuth: number;
  terrain: "urban overlook" | "coastal bluff" | "mountain summit" | "desert ridge" | "lakefront" | "park hill" | "canyon rim";
  description: string;
  access: string;
  bestSeasons: string[];
  features: string[];
  tips: string[];
}

export const SUNSET_SPOTS: SunsetSpot[] = [
  {
    id: "twin-peaks",
    name: "Twin Peaks Summit",
    city: "San Francisco",
    state: "CA",
    latitude: 37.754407,
    longitude: -122.447684,
    rating: 4.8,
    elevationMeters: 281,
    idealAzimuth: 285,
    terrain: "urban overlook",
    description:
      "360° views across the Bay Area that show off the Golden Gate, Sutro Tower, and rolling coastal fog.",
    access: "Drive-up overlook with short paved paths and safety railings.",
    bestSeasons: ["spring", "summer", "fall"],
    features: ["panoramic skyline", "ocean horizon", "city lights"],
    tips: [
      "Arrive 30 minutes before sunset to secure a parking spot.",
      "Pack layers—the wind accelerates along the ridge.",
    ],
  },
  {
    id: "griffith-observatory",
    name: "Griffith Observatory",
    city: "Los Angeles",
    state: "CA",
    latitude: 34.118434,
    longitude: -118.300393,
    rating: 4.9,
    elevationMeters: 346,
    idealAzimuth: 280,
    terrain: "urban overlook",
    description:
      "Iconic view of downtown LA framed by the Hollywood Hills with the Pacific glowing to the west.",
    access: "Paved trails and shuttle buses from the Greek Theatre parking lots.",
    bestSeasons: ["winter", "spring", "summer"],
    features: ["city skyline", "pacific ocean", "observatory dome"],
    tips: [
      "Weeknight visits are calmer—weekends fill quickly.",
      "Stay for twilight to watch city lights spark on.",
    ],
  },
  {
    id: "haleakala-summit",
    name: "Haleakalā Summit",
    city: "Kula",
    state: "HI",
    latitude: 20.709722,
    longitude: -156.253333,
    rating: 4.9,
    elevationMeters: 3055,
    idealAzimuth: 275,
    terrain: "mountain summit",
    description: "Cloud inversions blanket the volcanic crater while the sun sinks into the Pacific.",
    access: "Reservation-required park road with final steep grades—dress for alpine cold.",
    bestSeasons: ["year-round"],
    features: ["volcanic crater", "sea of clouds", "dark sky"],
    tips: [
      "Reserve a sunset pass on Recreation.gov before driving up.",
      "Bring gloves and a windproof layer even in summer.",
    ],
  },
  {
    id: "mount-bonnell",
    name: "Mount Bonnell",
    city: "Austin",
    state: "TX",
    latitude: 30.321634,
    longitude: -97.773487,
    rating: 4.7,
    elevationMeters: 236,
    idealAzimuth: 282,
    terrain: "park hill",
    description:
      "Limestone cliffs overlook the Colorado River with Hill Country ridgelines silhouetted at dusk.",
    access: "100 stone steps lead to a pavilion and western-facing overlook.",
    bestSeasons: ["spring", "fall"],
    features: ["river bend", "hill country horizon", "picnic tables"],
    tips: [
      "Use rideshare on weekends—the parking lot is small.",
      "Bring a flashlight for the descent after dark.",
    ],
  },
  {
    id: "mather-point",
    name: "Mather Point",
    city: "Grand Canyon Village",
    state: "AZ",
    latitude: 36.0594,
    longitude: -112.1093,
    rating: 4.8,
    elevationMeters: 2194,
    idealAzimuth: 300,
    terrain: "canyon rim",
    description:
      "Layered sandstone walls ignite with color as the sun sets behind the North Rim.",
    access: "Accessible walkway from the Grand Canyon Visitor Center.",
    bestSeasons: ["spring", "fall"],
    features: ["canyon amphitheater", "layered cliffs", "rim trail access"],
    tips: [
      "Arrive early to claim railing space for unobstructed photos.",
      "Watch the reflected glow inside the canyon 15 minutes after sunset.",
    ],
  },
  {
    id: "gas-works-park",
    name: "Gas Works Park",
    city: "Seattle",
    state: "WA",
    latitude: 47.6456,
    longitude: -122.3344,
    rating: 4.6,
    elevationMeters: 29,
    idealAzimuth: 295,
    terrain: "park hill",
    description: "Grassy mounds and industrial relics frame Lake Union with the Olympics in the distance.",
    access: "Paved paths and gentle hills suitable for all visitors.",
    bestSeasons: ["summer", "fall"],
    features: ["lake reflections", "city skyline", "mountain backdrop"],
    tips: [
      "Bring a blanket—the breeze across the lake cools quickly.",
      "Capture the skyline reflections just after sunset.",
    ],
  },
  {
    id: "cadillac-mountain",
    name: "Cadillac Mountain",
    city: "Bar Harbor",
    state: "ME",
    latitude: 44.3516,
    longitude: -68.2217,
    rating: 4.9,
    elevationMeters: 466,
    idealAzimuth: 300,
    terrain: "mountain summit",
    description: "Granite domes and island-speckled Frenchman Bay light up as the sun dips behind Mount Desert Island.",
    access: "Summit road (reservation in season) and short accessible paths.",
    bestSeasons: ["summer", "fall"],
    features: ["coastal islands", "granite ledges", "national park"],
    tips: [
      "Secure a vehicle reservation during peak summer mornings and evenings.",
      "Stay for the afterglow to watch colors ripple across the bay.",
    ],
  },
  {
    id: "sunset-cliffs",
    name: "Sunset Cliffs Natural Park",
    city: "San Diego",
    state: "CA",
    latitude: 32.7353,
    longitude: -117.2557,
    rating: 4.8,
    elevationMeters: 25,
    idealAzimuth: 272,
    terrain: "coastal bluff",
    description: "Golden sandstone cliffs drop into the Pacific with tide pools glowing at low tide.",
    access: "Street parking with dirt paths along the cliff edge—mind the drop-offs.",
    bestSeasons: ["winter", "spring", "summer"],
    features: ["ocean vista", "tide pools", "wave drama"],
    tips: [
      "Check the tide chart—low tide exposes extra foreground interest.",
      "Respect cliff edges; sandstone can crumble after rain.",
    ],
  },
  {
    id: "crissy-field",
    name: "Crissy Field Dunes",
    city: "San Francisco",
    state: "CA",
    latitude: 37.8061,
    longitude: -122.4648,
    rating: 4.5,
    elevationMeters: 5,
    idealAzimuth: 295,
    terrain: "coastal bluff",
    description: "Beachfront views of the Golden Gate Bridge with pastel hues reflecting off the bay.",
    access: "Level promenade suitable for bikes and wheelchairs.",
    bestSeasons: ["fall", "winter"],
    features: ["bridge views", "wildlife", "picnic areas"],
    tips: [
      "Carry a light jacket—the marine layer often rolls in at dusk.",
      "Walk east along the beach to frame the bridge and skyline together.",
    ],
  },
  {
    id: "morro-rock",
    name: "Morro Rock Lookout",
    city: "Morro Bay",
    state: "CA",
    latitude: 35.3725,
    longitude: -120.8594,
    rating: 4.7,
    elevationMeters: 45,
    idealAzimuth: 270,
    terrain: "coastal bluff",
    description: "Iconic volcanic plug anchors the harbor as the sun fades into the Pacific swells.",
    access: "Paved paths from the parking area; beach access nearby.",
    bestSeasons: ["spring", "fall"],
    features: ["volcanic monolith", "harbor", "wildlife"],
    tips: [
      "Scan for sea otters in the kelp beds just offshore.",
      "Arrive early on foggy days for the best chance of a clear view.",
    ],
  },
];
