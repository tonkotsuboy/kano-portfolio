export const parseDate = (isoDate: string) => {
  return new Date(isoDate).toLocaleDateString();
};
