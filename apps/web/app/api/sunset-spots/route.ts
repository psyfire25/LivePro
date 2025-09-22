import { NextRequest, NextResponse } from "next/server";

import { findTopSunsetSpots } from "@/src/lib/sunset/calc";

const MIN_RADIUS_KM = 5;
const MAX_RADIUS_KM = 200;
const DEFAULT_RADIUS_KM = 50;
const DEFAULT_LIMIT = 5;
const MAX_LIMIT = 8;

const clampNumber = (value: number, min: number, max: number) => {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
};

export function GET(request: NextRequest) {
  const url = new URL(request.url);
  const latParam = url.searchParams.get("lat");
  const lonParam = url.searchParams.get("lng") ?? url.searchParams.get("lon");

  if (latParam === null || lonParam === null) {
    return NextResponse.json(
      { error: "Missing required query parameters: lat and lng." },
      { status: 400 },
    );
  }

  const latitude = Number.parseFloat(latParam);
  const longitude = Number.parseFloat(lonParam);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return NextResponse.json(
      { error: "Invalid latitude or longitude provided." },
      { status: 400 },
    );
  }

  const radiusParam = url.searchParams.get("radiusKm") ?? url.searchParams.get("radius");
  const limitParam = url.searchParams.get("limit");

  const radiusKm = clampNumber(
    radiusParam ? Number.parseFloat(radiusParam) : DEFAULT_RADIUS_KM,
    MIN_RADIUS_KM,
    MAX_RADIUS_KM,
  );

  const limit = Math.round(
    clampNumber(limitParam ? Number.parseFloat(limitParam) : DEFAULT_LIMIT, 1, MAX_LIMIT),
  );

  const { sunset, matches, considered } = findTopSunsetSpots(latitude, longitude, {
    radiusKm,
    limit,
  });

  return NextResponse.json({
    query: {
      latitude,
      longitude,
      radiusKm,
      limit,
    },
    sunset,
    spots: matches.map((spot) => ({
      id: spot.id,
      name: spot.name,
      city: spot.city,
      state: spot.state,
      description: spot.description,
      latitude: spot.latitude,
      longitude: spot.longitude,
      distanceKm: Number(spot.distanceKm.toFixed(2)),
      rating: spot.rating,
      elevationMeters: spot.elevationMeters,
      idealAzimuth: spot.idealAzimuth,
      alignmentDelta: Number(spot.alignmentDelta.toFixed(1)),
      matchScore: Number(spot.matchScore.toFixed(3)),
      scores: spot.scores,
      terrain: spot.terrain,
      features: spot.features,
      bestSeasons: spot.bestSeasons,
      access: spot.access,
      tips: spot.tips,
    })),
    metadata: {
      consideredCount: considered.length,
    },
  });
}
