import camelize from 'camelize';
import axios from 'axios';

import {host, isMock} from '../../utils/env';

export const locationRequest = async searchTerm => {
  const url = `${host}/geocode?city=${searchTerm}&mock=${isMock}`;
  console.log('searchTerm', url);
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log('error', error);
    return error.json();
  }
};

export const locationTransform = result => {
  console.log('result', result);
  const formattedResponse = camelize(result);
  const {geometry = {}} = formattedResponse.results[0];
  const {lat, lng} = geometry.location;

  return {lat, lng, viewport: geometry.viewport};
};
