const localHost =
  'http://8530-99-13-224-111.ngrok.io/mealstogo-52272/us-central1';
const liveHost = 'https://us-central1-mealstogo-52272.cloudfunctions.net';

export const isMock = true;
export const isDevelopment = process.env.NODE_ENV === 'development';
export const host = isDevelopment ? localHost : liveHost;
