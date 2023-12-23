import { ICart } from '../types/types';

export const toCapitalCase = (string: string) => {
  string = string.replace(/\-/g, ' ')
  const first = string[0].toUpperCase()
  const rest = string.slice(1).toLowerCase();
  return first + rest;
}

export function mapFilter<T>(values: {}) {
  return Object.entries(values).filter(entry => entry[1]).map(entry => entry[0] as T)
}

export function getNameFromId<T>(DATA: { id: T, name: string }[], platformToFind: T) {
  return DATA.find(platform => platform.id === platformToFind)!.name || '';
}

export const calculateTotalAmount = (cart: ICart) =>
  cart.items.reduce((acc, item) =>
    item.orders.reduce((acc2, order) =>
      order.amount + acc2, 0) + acc, 0);

export const getRating = (rating: number) => {
  let ratingColor: string;
  if (rating <= 5 && rating >= 4.5) {
    ratingColor = 'green';
  } else if (rating < 4.5 && rating >= 3.5) {
    ratingColor = 'lightgreen';
  } else if (rating < 3.5 && rating >= 2.5) {
    ratingColor = 'yellow';
  } else if (rating < 2.5 && rating >= 1.5) {
    ratingColor = 'orange';
  } else {
    ratingColor = 'red';
  }
  return ratingColor;
}
