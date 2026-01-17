export const formatNumber = num => {
  if (num === null || num === undefined || num === '') {
    return '';
  }

  const numStr = String(num);

  const match = numStr.match(/([\d,]+)/);
  if (!match) {
    return numStr;
  }

  const numericPart = match[1].replace(/,/g, '');
  const number = parseFloat(numericPart);

  if (isNaN(number)) {
    return numStr;
  }

  const formatted = number.toLocaleString('en-US');

  const suffix = numStr.substring(match[0].length);

  return formatted + suffix;
};

export const extractNumber = num => {
  if (typeof num === 'number') {
    return num;
  }

  if (!num) {
    return 0;
  }

  const numStr = String(num);
  const match = numStr.match(/([\d,]+)/);
  if (!match) {
    return 0;
  }

  const numericPart = match[1].replace(/,/g, '');
  return parseFloat(numericPart) || 0;
};
