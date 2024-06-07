import { format, isToday, isYesterday, isThisYear } from "date-fns";

const formatDate = (date) => {
  const parsedDate = new Date(date);

  if (isToday(parsedDate)) {
    return `Today ${format(parsedDate, "p")}`;
  }

  if (isYesterday(parsedDate)) {
    return `Yesterday ${format(parsedDate, "p")}`;
  }

  if (isThisYear(parsedDate)) {
    return format(parsedDate, "d MMM p");
  }

  return format(parsedDate, "dd/MM/yy p");
};

export default formatDate;
