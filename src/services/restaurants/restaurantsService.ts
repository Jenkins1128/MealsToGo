import camelize from "camelize";
import axios, { AxiosError } from "axios";
import { host, isMock } from "@/utils/env";
import { Restaurant } from "../types";

interface RawPlaceResult {
  vicinity: string;
  opening_hours?: { open_now: boolean };
  business_status?: string;
  [key: string]: unknown;
}

export const restaurantsRequest = async (location: string) => {
  try {
    const res = await axios.get(
      `${host}/placesNearby?location=${location}&mock=${isMock}`
    );
    return res.data;
  } catch (error: unknown) {
    console.log("error", error);
    if (error instanceof AxiosError && error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
};

export const restaurantTransform = ({ results = [] }: { results: RawPlaceResult[] }) => {
  const mappedResult = results.map((restaurant) => {
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily:
        restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });
  return camelize(mappedResult) as Restaurant[];
};
