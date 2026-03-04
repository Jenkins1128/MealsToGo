const {geocodeRequest} = require('./geocode');
const {placesRequest} = require('./places');
const {payRequest} = require('./pay');

const {Client} = require('@googlemaps/google-maps-services-js');
const googleClient = new Client({});
const { defineJsonSecret } = require("firebase-functions/params");
const config = defineJsonSecret("RUNTIME_CONFIG");
const { onRequest } = require("firebase-functions/v2/https");

exports.geocode = onRequest(
  { secrets: [config] },
  (request, response) => {
  const googleKey = config.value().google.key;
  geocodeRequest(request, response, googleClient, googleKey);
});

exports.placesNearby = onRequest(
  { secrets: [config] },
  (request, response) => {
  const googleKey = config.value().google.key;
  console.log('places nearby google key', googleKey);
  placesRequest(request, response, googleClient, googleKey);
});

exports.pay = onRequest(// Bind secret to your function
  { secrets: [config] },
  (request, response) => {
  const stripeKey = config.value().stripe.key;
  const stripeClient = require('stripe')(stripeKey);
  payRequest(request, response, stripeClient);
});
