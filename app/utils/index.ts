export const createHttpsImage = (fileUrl: string): string => {
  return fileUrl.startsWith("//") ? "https:" + fileUrl : fileUrl;
};
