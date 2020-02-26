export const createSlug = (title: string) => {
  title = title.replace(/ä/g, 'ae');
  title = title.replace(/ö/g, 'oe');
  title = title.replace(/ü/g, 'ue');
  title = title.replace(/ß/g, 'ss');
  return title.toLowerCase().replace(' ', '-');
};
