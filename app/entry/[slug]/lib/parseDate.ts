import dayjs from "dayjs";

export const parseDate = (isoDate: string): string => {
  return dayjs(isoDate).format("YYYY/MM/DD");
};
