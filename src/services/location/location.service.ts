import camelize from 'camelize';
import axios from 'axios';
import {host, isMock} from '../../utils/env';
import {Location} from '../types';

export const locationRequest = async (searchTerm: string) => {
  const url = `${host}/geocode?city=${searchTerm}&mock=${isMock}`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error: any) {
    console.log('error', error);
    // Note: error.json() is not a function on axios errors, but keeping the original logic intent if it was expected to be a response object
    if (error.response && error.response.data) {
      return error.response.data;
    }
    throw error;
  }
};

export const locationTransform = (result: any): Location => {
  const formattedResponse = camelize(result);
  const {geometry = {}} = formattedResponse.results[0];
  const {lat, lng} = geometry.location;
  return {lat, lng, viewport: geometry.viewport};
};
