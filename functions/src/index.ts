import { onRequest } from "firebase-functions/v2/https";
import { Client } from "@googlemaps/google-maps-services-js";
import Stripe from "stripe";

import { geocodeRequest } from "./geocode";
import { placesRequest } from "./places";
import { payRequest } from "./pay";

const googleClient = new Client({});

export const geocode = onRequest(
  {
    secrets: ["RUNTIME_CONFIG"],
  },
  (request, response) => {
    if (!process.env.RUNTIME_CONFIG) {
      throw new Error("RUNTIME_CONFIG secret is missing from environment");
    }
    const config = JSON.parse(process.env.RUNTIME_CONFIG);
    const googleKey = config?.GOOGLE_KEY;
    if (!googleKey) {
      response.status(500).send("Google API Key not found in config");
      return;
    }
    geocodeRequest(request as any, response as any, googleClient, googleKey);
  }
);

export const placesNearby = onRequest(
  {
    secrets: ["RUNTIME_CONFIG"],
  },
  (request, response) => {
    if (!process.env.RUNTIME_CONFIG) {
      throw new Error("RUNTIME_CONFIG secret is missing from environment");
    }
    const config = JSON.parse(process.env.RUNTIME_CONFIG);
    const googleKey = config?.GOOGLE_KEY;
    if (!googleKey) {
      response.status(500).send("Google API Key not found in config");
      return;
    }
    placesRequest(request as any, response as any, googleClient, googleKey);
  }
);

export const pay = onRequest(
  { secrets: ["RUNTIME_CONFIG"] },
  (request, response) => {
    if (!process.env.RUNTIME_CONFIG) {
      throw new Error("RUNTIME_CONFIG secret is missing from environment");
    }
    const config = JSON.parse(process.env.RUNTIME_CONFIG);
    const stripeKey = config?.STRIPE_KEY;
    if (!stripeKey) {
      response.status(500).send("Stripe API Key not found in config");
      return;
    }
    const stripeClient = new Stripe(stripeKey, {
      apiVersion: "2022-11-15",
    });
    payRequest(request as any, response as any, stripeClient);
  }
);

