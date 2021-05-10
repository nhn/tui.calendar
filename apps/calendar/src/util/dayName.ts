export const getDayName = (dayIndex: number) => {
  return ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][dayIndex];
};

export function capitalizeDayName(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}
