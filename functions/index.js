const {geocodeRequest} = require('./geocode');
const {placesRequest} = require('./places');
const {payRequest} = require('./pay');

const {Client} = require('@googlemaps/google-maps-services-js');
const googleClient = new Client({});
const {defineJsonSecret} = require('firebase-functions/params');
const config = defineJsonSecret('RUNTIME_CONFIG');
const {onRequest} = require('firebase-functions/v2/https');

exports.geocode = onRequest(
  {
    secrets: ['RUNTIME_CONFIG'],
  },
  (request, response) => {
    if (!process.env.RUNTIME_CONFIG) {
      throw new Error('RUNTIME_CONFIG secret is missing from environment');
    }
    const config = JSON.parse(process.env.RUNTIME_CONFIG);
    const googleKey = config?.GOOGLE_KEY;
    if (!googleKey) {
      return res.status(500).send('Google API Key not found in config');
    }
    geocodeRequest(request, response, googleClient, googleKey);
  },
);

exports.placesNearby = onRequest(
  {
    secrets: ['RUNTIME_CONFIG'],
  },
  (request, response) => {
    if (!process.env.RUNTIME_CONFIG) {
      throw new Error('RUNTIME_CONFIG secret is missing from environment');
    }
    const config = JSON.parse(process.env.RUNTIME_CONFIG);
    const googleKey = config?.GOOGLE_KEY;
    if (!googleKey) {
      return res.status(500).send('Google API Key not found in config');
    }
    placesRequest(request, response, googleClient, googleKey);
  },
);

exports.pay = onRequest(
  // Bind secret to your function
  {secrets: ['RUNTIME_CONFIG']},
  (request, response) => {
     if (!process.env.RUNTIME_CONFIG) {
      throw new Error('RUNTIME_CONFIG secret is missing from environment');
    }
    const config = JSON.parse(process.env.RUNTIME_CONFIG);
    const stripeKey = config?.STRIPE_KEY;
    if (!stripeKey) {
      return res.status(500).send('Stripe API Key not found in config');
    }
    const stripeClient = require('stripe')(stripeKey);
    payRequest(request, response, stripeClient);
  },
);
