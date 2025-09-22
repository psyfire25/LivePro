"use client";

import { useCallback, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import { Button } from "@repo/ui/src/components/ui/button";
import { Input } from "@repo/ui/src/components/ui/input";

interface SunsetDetails {
  sunsetIso: string;
  goldenHourStartIso: string;
  azimuthDegrees: number;
  dayLengthMinutes: number;
}

interface SunsetSpotApi {
  id: string;
  name: string;
  city: string;
  state: string;
  description: string;
  latitude: number;
  longitude: number;
  distanceKm: number;
  rating: number;
  elevationMeters: number;
  idealAzimuth: number;
  alignmentDelta: number;
  matchScore: number;
  scores: {
    rating: number;
    distance: number;
    elevation: number;
    orientation: number;
    features: number;
  };
  terrain: string;
  features: string[];
  bestSeasons: string[];
  access: string;
  tips: string[];
}

interface SunsetSpotResponse {
  query: {
    latitude: number;
    longitude: number;
    radiusKm: number;
    limit: number;
  };
  sunset: SunsetDetails;
  spots: SunsetSpotApi[];
  metadata: {
    consideredCount: number;
  };
}

const formatTime = (iso: string) =>
  new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date(iso));

const formatDistance = (value: number) => `${value.toFixed(1)} km`;

const formatScore = (value: number) => `${Math.round(value * 100)}% match`;

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainder = Math.round(minutes % 60);
  return `${hours}h ${remainder}m of daylight`;
};

type Coordinates = {
  latitude: number;
  longitude: number;
};

export default function SunsetPlannerPage() {
  const [manualLatitude, setManualLatitude] = useState("");
  const [manualLongitude, setManualLongitude] = useState("");
  const [radiusInput, setRadiusInput] = useState("50");
  const [radiusKm, setRadiusKm] = useState(50);
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [results, setResults] = useState<SunsetSpotResponse | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSpots = useCallback(
    async (latitude: number, longitude: number, radiusOverride?: number) => {
      const searchRadius = radiusOverride ?? radiusKm;
      setIsLoading(true);
      setErrorMessage(null);
      setStatusMessage(
        `Searching within ${searchRadius} km of ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
      );

      try {
        const params = new URLSearchParams({
          lat: latitude.toFixed(6),
          lng: longitude.toFixed(6),
          radiusKm: searchRadius.toString(),
          limit: "5",
        });
        const response = await fetch(`/api/sunset-spots?${params.toString()}`);
        const payload = (await response.json()) as SunsetSpotResponse & { error?: string };

        if (!response.ok) {
          throw new Error(payload.error ?? "Unable to load sunset spots.");
        }

        setCoords({ latitude, longitude });
        setManualLatitude(latitude.toFixed(4));
        setManualLongitude(longitude.toFixed(4));
        setRadiusKm(searchRadius);
        setRadiusInput(String(searchRadius));
        setResults(payload);
        setStatusMessage(
          `Showing results for ${latitude.toFixed(4)}, ${longitude.toFixed(4)} within ${searchRadius} km.`,
        );
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error occurred.";
        setErrorMessage(message);
        setResults(null);
        setStatusMessage(null);
      } finally {
        setIsLoading(false);
      }
    },
    [radiusKm],
  );

  const handleLatitudeChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setManualLatitude(event.target.value);
  }, []);

  const handleLongitudeChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setManualLongitude(event.target.value);
  }, []);

  const handleRadiusChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setRadiusInput(event.target.value);
  }, []);

  const handleUseLocation = useCallback(() => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setErrorMessage("Geolocation is not supported in this browser.");
      return;
    }

    setErrorMessage(null);
    setStatusMessage("Requesting your GPS location…");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchSpots(latitude, longitude);
      },
      (error) => {
        setErrorMessage(error.message ?? "Could not retrieve your location.");
        setStatusMessage(null);
      },
      { enableHighAccuracy: true, timeout: 10_000 },
    );
  }, [fetchSpots]);

  const handleManualSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const latitude = Number.parseFloat(manualLatitude);
      const longitude = Number.parseFloat(manualLongitude);

      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        setErrorMessage("Enter valid numeric coordinates for latitude and longitude.");
        return;
      }

      fetchSpots(latitude, longitude);
    },
    [fetchSpots, manualLatitude, manualLongitude],
  );

  const handleRadiusBlur = useCallback(() => {
    const parsed = Number.parseFloat(radiusInput);
    if (Number.isFinite(parsed)) {
      const safeRadius = Math.min(200, Math.max(5, parsed));
      setRadiusKm(safeRadius);
      setRadiusInput(String(safeRadius));

      if (coords) {
        fetchSpots(coords.latitude, coords.longitude, safeRadius);
      }
    } else {
      setRadiusInput(String(radiusKm));
    }
  }, [coords, fetchSpots, radiusInput, radiusKm]);

  const sunsetDetails = results?.sunset;
  const spots: SunsetSpotApi[] = results?.spots ?? [];

  const summary = useMemo(() => {
    if (!results || !coords) return null;
    return `Top ${spots.length} matches within ${results.query.radiusKm} km of your location.`;
  }, [coords, results, spots.length]);

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 p-8 lp-prose">
      <section className="lp-card lp-card-lg">
        <h1>Sunset Spot Finder</h1>
        <p className="max-w-2xl">
          Drop in your GPS coordinates or let the browser share your location to surface curated overlooks, coastal cliffs,
          and park hills from our topography-backed dataset. We weigh elevation, orientation, and traveler ratings to highlight the best sunset staging areas around you.
        </p>
      </section>

      <section className="lp-card space-y-5">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">1. Start with your location</h2>
          <p className="text-sm opacity-80">
            Use GPS for instant results or paste coordinates manually. Adjust the radius to search further into surrounding terrain.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="button" onClick={handleUseLocation} disabled={isLoading}>
            {isLoading ? "Locating…" : "Use my GPS"}
          </Button>
          {statusMessage && <p className="text-sm opacity-80">{statusMessage}</p>}
        </div>

        <form className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" onSubmit={handleManualSubmit}>
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase opacity-70" htmlFor="latitude-input">
              Latitude
            </label>
            <Input
              id="latitude-input"
              value={manualLatitude}
              onChange={handleLatitudeChange}
              placeholder="37.7749"
              type="number"
              step="0.0001"
              inputMode="decimal"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase opacity-70" htmlFor="longitude-input">
              Longitude
            </label>
            <Input
              id="longitude-input"
              value={manualLongitude}
              onChange={handleLongitudeChange}
              placeholder="-122.4194"
              type="number"
              step="0.0001"
              inputMode="decimal"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase opacity-70" htmlFor="radius-input">
              Radius (km)
            </label>
            <Input
              id="radius-input"
              value={radiusInput}
              onChange={handleRadiusChange}
              onBlur={handleRadiusBlur}
              type="number"
              min={5}
              max={200}
              step="5"
            />
          </div>
          <div className="flex items-end">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Searching…" : "Find sunset spots"}
            </Button>
          </div>
        </form>

        {errorMessage && <p className="text-sm text-red-400">{errorMessage}</p>}
        {!errorMessage && summary && <p className="text-sm opacity-80">{summary}</p>}
      </section>

      {sunsetDetails && (
        <section className="lp-card space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold">2. Tonight&apos;s light profile</h2>
            <p className="text-sm opacity-70">Sunset azimuth {sunsetDetails.azimuthDegrees.toFixed(0)}°</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-white/10 p-4">
              <div className="text-xs font-semibold uppercase opacity-60">Sunset</div>
              <div className="text-lg font-semibold">{formatTime(sunsetDetails.sunsetIso)}</div>
              <p className="text-sm opacity-70">Golden hour starts {formatTime(sunsetDetails.goldenHourStartIso)}</p>
            </div>
            <div className="rounded-lg border border-white/10 p-4">
              <div className="text-xs font-semibold uppercase opacity-60">Daylight</div>
              <div className="text-lg font-semibold">{formatDuration(sunsetDetails.dayLengthMinutes)}</div>
              <p className="text-sm opacity-70">Plan to arrive 30 minutes early for setup.</p>
            </div>
            <div className="rounded-lg border border-white/10 p-4">
              <div className="text-xs font-semibold uppercase opacity-60">Orientation</div>
              <div className="text-lg font-semibold">{sunsetDetails.azimuthDegrees.toFixed(0)}° azimuth</div>
              <p className="text-sm opacity-70">Look for ridgelines facing due west to northwest.</p>
            </div>
          </div>
        </section>
      )}

      {results && (
        <section className="space-y-4">
          <div className="lp-card">
            <h2 className="text-xl font-semibold">3. Top sunset stages nearby</h2>
            <p className="text-sm opacity-80">
              We ranked candidate overlooks using topographic prominence, traveler sentiment, and how closely each vantage point aligns with tonight&apos;s sunset azimuth.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {spots.map((spot: SunsetSpotApi) => (
              <article key={spot.id} className="lp-card space-y-3">
                <header className="space-y-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold">{spot.name}</h3>
                      <p className="text-sm opacity-70">
                        {spot.city}, {spot.state} · {formatDistance(spot.distanceKm)}
                      </p>
                    </div>
                    <span className="text-sm font-semibold">{formatScore(spot.matchScore)}</span>
                  </div>
                  <p className="text-sm opacity-80">{spot.description}</p>
                </header>

                <dl className="grid gap-2 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="font-semibold uppercase opacity-70">Terrain</dt>
                    <dd className="opacity-80">{spot.terrain}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold uppercase opacity-70">Elevation</dt>
                    <dd className="opacity-80">{Math.round(spot.elevationMeters)} m</dd>
                  </div>
                  <div>
                    <dt className="font-semibold uppercase opacity-70">Orientation</dt>
                    <dd className="opacity-80">
                      Faces {spot.idealAzimuth.toFixed(0)}° · alignment Δ {spot.alignmentDelta.toFixed(0)}°
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold uppercase opacity-70">Quality mix</dt>
                    <dd className="opacity-80">
                      Rating {(spot.scores.rating * 100).toFixed(0)}% · Distance {(spot.scores.distance * 100).toFixed(0)}% ·
                      Orientation {(spot.scores.orientation * 100).toFixed(0)}%
                    </dd>
                  </div>
                </dl>

                <div className="space-y-2">
                  <div>
                    <div className="text-xs font-semibold uppercase opacity-70">Highlights</div>
                    <p className="text-sm opacity-80">{spot.features.join(", ")}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase opacity-70">Best seasons</div>
                    <p className="text-sm opacity-80">{spot.bestSeasons.join(", ")}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase opacity-70">Access notes</div>
                    <p className="text-sm opacity-80">{spot.access}</p>
                  </div>
                </div>

                <ul className="list-disc space-y-1 pl-5 text-sm opacity-80">
                  {spot.tips.map((tip: string) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
