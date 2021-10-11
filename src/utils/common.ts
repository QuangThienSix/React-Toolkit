export const capitalizeString = (s: string) => {
  if (!s) return '';
  return `${s[0].toUpperCase()}${s.slice(1)}`;
};

export const getMarkColor = (mark: number): string => {
  if (mark >= 8) return 'green';
  if (mark >= 4) return 'goldenrod';
  return 'red';
};
