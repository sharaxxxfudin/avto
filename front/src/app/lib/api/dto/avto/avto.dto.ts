export interface AvtoDTOJapan {
  id: string;
  brand: string;
  model: string;
  trim: string;
  year: number;
  mileage: number;
  engine: number;
  price: number;
  currency: string;
  image: string;
  grade: string;
  lot: string;

}
export interface AvtoDTOKorea {
  brand: string;
  model: string;
  year: number;
  link: string;
  image: string;
  engine: string;
  fuel: string;
  transmission: string;
  mileage: number;
  price_won: number;
  price_rub: number;
  trim?: string; // если бывает trim
}
