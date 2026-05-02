export interface Location {
  lat: number;
  lng: number;
  viewport: {
    northeast: {lat: number; lng: number};
    southwest: {lat: number; lng: number};
  };
}

export interface Restaurant {
  name: string;
  icon: string;
  photos: string[];
  address: string;
  isOpenNow: boolean;
  rating: number;
  isClosedTemporarily: boolean;
  geometry: {
    location: {lat: number; lng: number};
    viewport: {
      northeast: {lat: number; lng: number};
      southwest: {lat: number; lng: number};
    };
  };
  placeId: string;
  businessStatus: string;
  vicinity: string;
}

export interface CartItem {
  item: string;
  price: number;
}
