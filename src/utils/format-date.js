import { format } from "date-fns";
import { nl, enUS } from "date-fns/locale";

export const formatLocalizedDate = (day, month, year, locale) => {
  const _date = new Date(year, month, day);
  return format(_date, "d MMM yyy", { locale: locale === "nl" ? nl : enUS });
};
