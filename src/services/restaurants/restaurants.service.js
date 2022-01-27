import camelize from 'camelize';
import axios from 'axios';
import {host, isMock} from '../../utils/env';

export const restaurantsRequest = async location => {
  console.log('location', location);
  try {
    const res = await axios.get(
      `${host}/placesNearby?location=${location}&mock=${isMock}`,
    );
    return res.data;
  } catch (error) {
    console.log('error', error);
    return error.json();
  }
};

export const restaurantTransform = ({results = []}) => {
  const mappedResult = results.map(restaurant => {
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === 'CLOSED_TEMPORARILY',
    };
  });
  return camelize(mappedResult);
};
