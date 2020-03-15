export interface Dish {
  id?: string;
  name: string;
  price: number;
  ingredients: string[];
  isMonth?: boolean;
  isWhite?: boolean;
}
