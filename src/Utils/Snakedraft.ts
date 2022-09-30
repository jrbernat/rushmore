export const getPickerIndex = (i: number) => {
  if (i === 0 || i === 7 || i === 8 || i === 15) {
    return 0;
  }
  if (i === 1 || i === 6 || i === 9 || i === 14) {
    return 1;
  }
  if (i === 2 || i === 5 || i === 10 || i === 13) {
    return 2;
  }
  return 3;
};

export const getPickIndex = (i: number) => {
  return `${Math.floor(i / 4) + 1}.${(i % 4) + 1}`;
};
