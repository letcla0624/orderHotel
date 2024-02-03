export function toDiffDays(date1: Date, date2: Date) {
  const startDate = new Date(date1).getTime();
  const endDate = new Date(date2).getTime();
  // 把相差的毫秒數轉換為天數
  const diffDays = parseInt(
    (Math.abs(startDate - endDate) / 1000 / 60 / 60 / 24) as unknown as string
  );

  return diffDays;
}
