import { Request, Response } from "express";
import { Client } from "@googlemaps/google-maps-services-js";
import { locations as locationsMock } from "./geocode.mock";

export const geocodeRequest = async (
  request: Request,
  response: Response,
  client: Client,
  googleKey: string
) => {
  const { city, mock } = request.query;

  if (typeof city !== "string") {
    response.status(400).send("City is required");
    return;
  }

  if (mock === "true") {
    const locationMock = locationsMock[city.toLowerCase()];
    response.json(locationMock);
    return;
  }

  try {
    const res = await client.geocode({
      params: {
        address: city,
        key: googleKey,
      },
      timeout: 1000,
    });
    response.json(res.data);
    return;
  } catch (e: any) {
    response.status(400);
    response.send(e.response?.data?.error_message || "Geocoding error");
    return;
  }
};
