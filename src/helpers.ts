export const createSlug = (value) => {
  return value?.toLowerCase()?.replace(' ', '-');
};
