export const toCapitalCase = (string: string) => {
  string = string.replace(/\-/g, ' ')
  const first = string[0].toUpperCase()
  const rest = string.slice(1).toLowerCase();
  return first + rest;
}

export function mapFilter<T>(values: {}) {
  return Object.entries(values).filter(entry => entry[1]).map(entry => entry[0] as T)
}