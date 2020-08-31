export const fetchOgInfo = async (
  url: string
): Promise<{ ogTitle: string | null; ogImage: string | null }> => {
  const urlText = await (await fetch(url)).text();

  const ogImage =
    /property="og:image" content="(.*?)"/.exec(urlText)?.[1] ?? null;
  const ogTitle =
    /property="og:title" content="(.*?)"/.exec(urlText)?.[1] ?? null;

  return { ogImage, ogTitle };
};
