export const formatFloat = (num, n) => {
  if (num) {
    if (typeof num == 'string') {
      return parseFloat(parseFloat(num).toFixed(n));
    } else {
      return parseFloat(num.toFixed(n));
    }
  }
  return 0.0;
};
