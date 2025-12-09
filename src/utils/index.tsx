export const getDailyScheduleKey = (date = new Date()): string => {
  return date.toISOString().slice(0, 10); // "YYYY-MM-DD"
};

export const getWeeklyScheduleKey = (date = new Date()): string => {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const dayNum = d.getUTCDay() || 7;

  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNumber = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);

  return `${d.getUTCFullYear()}-W${weekNumber}`;
};
