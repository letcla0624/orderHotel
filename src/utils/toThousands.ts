export function toThousands(num: number): string {
  const comma = /\B(?=(\d{3})+(?!\d))/g;
  return num?.toString().replace(comma, ",").replace(/ /g, "\u00a0");
}
