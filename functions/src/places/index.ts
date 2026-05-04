import { Request, Response } from "express";
import { Client } from "@googlemaps/google-maps-services-js";
import { mocks, addMockImage } from "./mock";
import { PlaceResult } from "../types";

const addGoogleImage = (restaurant: PlaceResult, googleKey: string) => {
  const ref = restaurant.photos?.[0]?.photo_reference;
  if (!ref) {
    restaurant.photos = [
      {
        height: 899,
        html_attributions: [],
        photo_reference: "",
        width: 600,
      } as any, // In the original code it was just a string, but the API expects an array of objects. 
                 // However, the original code REPLACED the array with a string array. 
                 // I'll stick to the original behavior but type it correctly.
    ];
    // Re-assigning to match original logic which turned photos into a string array
    (restaurant.photos as unknown as string[]) = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ];
    return restaurant;
  }
  (restaurant.photos as unknown as string[]) = [
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${googleKey}`,
  ];
  return restaurant;
};

export const placesRequest = async (
  request: Request,
  response: Response,
  client: Client,
  googleKey: string
) => {
  const { location, mock } = request.query;

  if (typeof location !== "string") {
    response.status(400).send("Location is required");
    return;
  }

  if (mock === "true") {
    const data = mocks[location];
    if (data) {
      data.results = data.results.map(addMockImage);
    }
    response.json(data);
    return;
  }

  try {
    const res = await client.placesNearby({
      params: {
        location: location,
        radius: 1000,
        type: "restaurant",
        key: googleKey,
      },
      timeout: 1000,
    });
    (res.data.results as any) = res.data.results.map((restaurant: any) =>
      addGoogleImage(restaurant, googleKey)
    );
    response.json(res.data);
    return;
  } catch (e: any) {
    response.status(400);
    response.send(e.response?.data?.error_message || "Places error");
    return;
  }
};
