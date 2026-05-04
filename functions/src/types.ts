import { Response } from "express";

export interface LatLng {
  lat: number;
  lng: number;
}

export interface Viewport {
  northeast: LatLng;
  southwest: LatLng;
}

export interface Geometry {
  location: LatLng;
  viewport: Viewport;
}

export interface Photo {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}

export interface OpeningHours {
  open_now: boolean;
}

export interface PlusCode {
  compound_code: string;
  global_code: string;
}

export interface PlaceResult {
  business_status?: string;
  geometry: Geometry;
  icon?: string;
  ix?: string; // Custom field in some mocks
  name: string;
  opening_hours?: OpeningHours;
  photos?: Photo[];
  place_id: string;
  plus_code?: PlusCode;
  price_level?: number;
  rating?: number;
  reference?: string;
  scope?: string;
  types?: string[];
  user_ratings_total?: number;
  vicinity: string;
  permanently_closed?: boolean;
}

export interface GooglePlacesResponse {
  html_attributions: string[];
  next_page_token?: string;
  results: PlaceResult[];
  status?: string;
}

export interface GeocodeResponse {
  results: Array<{
    geometry: Geometry;
    place_id?: string;
    types?: string[];
  }>;
  status: string;
}

// Helper to type Firebase Function responses
export type FunctionsResponse = Response;
