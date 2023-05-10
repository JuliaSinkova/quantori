export function displayDate(date: string): string {
  const fullDate = new Date(date);
  const shortDateString = fullDate.toDateString();
  const fullDateStringWithYear = fullDate.toLocaleDateString("en-us", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const fullDateString = fullDate.toLocaleDateString("en-us", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const nowFullDate = new Date();
  const nowShortDateString = nowFullDate.toDateString();

  const tommorowFullDate = new Date();
  tommorowFullDate.setDate(tommorowFullDate.getDate() + 1);
  const tommorowShortDateString = tommorowFullDate.toDateString();

  const isToday = shortDateString === nowShortDateString;
  const isTommorow = shortDateString === tommorowShortDateString;
  const isCurrentYear = fullDate.getFullYear() === nowFullDate.getFullYear();

  if (isToday) {
    return "Today";
  }

  if (isTommorow) {
    return "Tomorrow";
  }

  if (isCurrentYear) {
    return fullDateString;
  }

  return fullDateStringWithYear;
}
