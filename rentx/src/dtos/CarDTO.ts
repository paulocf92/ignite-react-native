interface AccessoryData {
  id: string;
  type: string;
  name: string;
}

export interface PhotoData {
  id: string;
  photo: string;
}

export interface CarDTO {
  id: string;
  brand: string;
  name: string;
  about: string;
  period: string;
  price: number;
  fuel_type: string;
  thumbnail: string;
  accessories: AccessoryData[];
  photos: PhotoData[];
}
