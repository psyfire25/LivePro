import { SUNSET_SPOTS, type SunsetSpot } from "./data";

const EARTH_RADIUS_KM = 6371;

export interface SunsetDetails {
  sunsetIso: string;
  goldenHourStartIso: string;
  azimuthDegrees: number;
  dayLengthMinutes: number;
}

export interface SunsetSpotMatch extends SunsetSpot {
  distanceKm: number;
  matchScore: number;
  alignmentDelta: number;
  scores: {
    rating: number;
    distance: number;
    elevation: number;
    orientation: number;
    features: number;
  };
}

export interface FindSunsetSpotOptions {
  radiusKm?: number;
  limit?: number;
  date?: Date;
}

export interface SunsetSearchResult {
  sunset: SunsetDetails;
  matches: SunsetSpotMatch[];
  considered: SunsetSpotMatch[];
}

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
const toDegrees = (radians: number) => (radians * 180) / Math.PI;

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

const angularDifference = (a: number, b: number) => {
  const diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
};

const minutesToDate = (base: Date, minutes: number) => {
  const startOfDayUtc = Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate(), 0, 0, 0, 0);
  return new Date(startOfDayUtc + minutes * 60_000);
};

const getDayOfYear = (date: Date) => {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0, 0, 0, 0, 0);
  const diff = date.getTime() - start;
  return Math.floor(diff / 86_400_000);
};

const equationOfTimeMinutes = (dayOfYear: number) => {
  const b = ((2 * Math.PI) / 364) * (dayOfYear - 81);
  return 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
};

const solarDeclination = (dayOfYear: number) => {
  return 0.409 * Math.sin(((2 * Math.PI) / 365) * dayOfYear - 1.39);
};

export const haversineDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const radLat1 = toRadians(lat1);
  const radLat2 = toRadians(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(radLat1) * Math.cos(radLat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
};

export const calculateSunsetDetails = (latitude: number, longitude: number, date = new Date()): SunsetDetails => {
  const dayOfYear = getDayOfYear(date);
  const eqTime = equationOfTimeMinutes(dayOfYear);
  const decl = solarDeclination(dayOfYear);
  const latRad = toRadians(latitude);
  const hourAngle = Math.acos(
    Math.min(
      Math.max(-1, -Math.tan(latRad) * Math.tan(decl)),
      1,
    ),
  );

  const hourAngleDeg = toDegrees(hourAngle);
  const solarNoonMinutes = 720 - 4 * longitude - eqTime;
  const sunsetUtcMinutes = solarNoonMinutes + hourAngleDeg * 4;
  const goldenHourStartMinutes = sunsetUtcMinutes - 45;

  const azimuthRad = Math.atan2(
    Math.sin(hourAngle),
    Math.cos(hourAngle) * Math.sin(latRad) - Math.tan(decl) * Math.cos(latRad),
  );
  const azimuthDeg = (toDegrees(azimuthRad) + 360) % 360;

  const dayLengthMinutes = ((2 * hourAngleDeg) / 15) * 60;

  return {
    sunsetIso: minutesToDate(date, sunsetUtcMinutes).toISOString(),
    goldenHourStartIso: minutesToDate(date, goldenHourStartMinutes).toISOString(),
    azimuthDegrees: azimuthDeg,
    dayLengthMinutes,
  };
};

const buildMatch = (
  spot: SunsetSpot,
  userLat: number,
  userLon: number,
  sunsetAzimuth: number,
  radiusKm: number,
): SunsetSpotMatch => {
  const distanceKm = haversineDistanceKm(userLat, userLon, spot.latitude, spot.longitude);
  const ratingScore = clamp01(spot.rating / 5);
  const distanceScore = clamp01(1 - distanceKm / Math.max(radiusKm, 1));
  const elevationScore = clamp01(spot.elevationMeters / 700);
  const alignmentDelta = angularDifference(sunsetAzimuth, spot.idealAzimuth);
  const orientationScore = clamp01(1 - alignmentDelta / 180);
  const featuresScore = clamp01(spot.features.length / 4);

  const matchScore =
    ratingScore * 0.35 +
    distanceScore * 0.25 +
    elevationScore * 0.15 +
    orientationScore * 0.2 +
    featuresScore * 0.05;

  return {
    ...spot,
    distanceKm,
    matchScore,
    alignmentDelta,
    scores: {
      rating: ratingScore,
      distance: distanceScore,
      elevation: elevationScore,
      orientation: orientationScore,
      features: featuresScore,
    },
  };
};

export const findTopSunsetSpots = (
  latitude: number,
  longitude: number,
  options: FindSunsetSpotOptions = {},
): SunsetSearchResult => {
  const { radiusKm = 50, limit = 5, date = new Date() } = options;
  const sunset = calculateSunsetDetails(latitude, longitude, date);

  const evaluated = SUNSET_SPOTS.map((spot) =>
    buildMatch(spot, latitude, longitude, sunset.azimuthDegrees, radiusKm),
  ).sort((a, b) => b.matchScore - a.matchScore);

  const withinRadius = evaluated.filter((spot) => spot.distanceKm <= radiusKm);
  const desiredCount = Math.max(1, Math.min(limit, evaluated.length));
  let matches = withinRadius.slice(0, desiredCount);

  if (matches.length < Math.min(desiredCount, 3)) {
    const needed = desiredCount - matches.length;
    const extras = evaluated.filter((spot) => !matches.includes(spot)).slice(0, needed);
    matches = matches.concat(extras);
  }

  return {
    sunset,
    matches,
    considered: evaluated,
  };
};
