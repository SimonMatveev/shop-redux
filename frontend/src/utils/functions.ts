export const toCapitalCase = (string: string) => {
  string = string.replace(/\-/g, ' ')
  const first = string[0].toUpperCase()
  const rest = string.slice(1).toLowerCase();
  return first + rest;
}