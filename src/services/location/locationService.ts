import camelize from "camelize";
import axios, { AxiosError } from "axios";
import { host, isMock } from "@/utils/env";
import { Location } from "../types";

interface RawGeocodeResult {
  results: Array<{
    geometry: {
      location: { lat: number; lng: number };
      viewport: {
        northeast: { lat: number; lng: number };
        southwest: { lat: number; lng: number };
      };
    };
  }>;
}

export const locationRequest = async (searchTerm: string) => {
  const url = `${host}/geocode?city=${searchTerm}&mock=${isMock}`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error: unknown) {
    console.log("error", error);
    if (error instanceof AxiosError && error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
};

export const locationTransform = (result: RawGeocodeResult): Location => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;
  return { lat, lng, viewport: geometry.viewport };
};
