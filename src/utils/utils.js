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

export const COLOR_ZONES = ['#FF0000', '#FFC100', '#FFFF00', '#D6FF00', '#63FF00'];
