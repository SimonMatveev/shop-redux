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