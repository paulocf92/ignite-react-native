interface RentData {
  period: string;
  price: number;
}

interface AccessoryData {
  type: string;
  name: string;
}

export interface CarDTO {
  id: string;
  brand: string;
  name: string;
  about: string;
  rent: RentData;
  fuel_type: string;
  thumbnail: string;
  accessories: AccessoryData[];
  photos: string[];
}
