"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pay = exports.placesNearby = exports.geocode = void 0;
const https_1 = require("firebase-functions/v2/https");
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
const stripe_1 = __importDefault(require("stripe"));
const geocode_1 = require("./geocode");
const places_1 = require("./places");
const pay_1 = require("./pay");
const googleClient = new google_maps_services_js_1.Client({});
exports.geocode = (0, https_1.onRequest)({
    secrets: ["RUNTIME_CONFIG"],
}, (request, response) => {
    if (!process.env.RUNTIME_CONFIG) {
        throw new Error("RUNTIME_CONFIG secret is missing from environment");
    }
    const config = JSON.parse(process.env.RUNTIME_CONFIG);
    const googleKey = config?.GOOGLE_KEY;
    if (!googleKey) {
        response.status(500).send("Google API Key not found in config");
        return;
    }
    (0, geocode_1.geocodeRequest)(request, response, googleClient, googleKey);
});
exports.placesNearby = (0, https_1.onRequest)({
    secrets: ["RUNTIME_CONFIG"],
}, (request, response) => {
    if (!process.env.RUNTIME_CONFIG) {
        throw new Error("RUNTIME_CONFIG secret is missing from environment");
    }
    const config = JSON.parse(process.env.RUNTIME_CONFIG);
    const googleKey = config?.GOOGLE_KEY;
    if (!googleKey) {
        response.status(500).send("Google API Key not found in config");
        return;
    }
    (0, places_1.placesRequest)(request, response, googleClient, googleKey);
});
exports.pay = (0, https_1.onRequest)({ secrets: ["RUNTIME_CONFIG"] }, (request, response) => {
    if (!process.env.RUNTIME_CONFIG) {
        throw new Error("RUNTIME_CONFIG secret is missing from environment");
    }
    const config = JSON.parse(process.env.RUNTIME_CONFIG);
    const stripeKey = config?.STRIPE_KEY;
    if (!stripeKey) {
        response.status(500).send("Stripe API Key not found in config");
        return;
    }
    const stripeClient = new stripe_1.default(stripeKey, {
        apiVersion: "2022-11-15",
    });
    (0, pay_1.payRequest)(request, response, stripeClient);
});
//# sourceMappingURL=index.js.map