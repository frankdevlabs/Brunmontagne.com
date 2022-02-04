const bp = {
  sm: 500,
  md: 768,
  lg: 992,
  xl: 1159,
  xxl: 1439,
};

const mq = (n) => {
  const bpArray = Object.keys(bp).map((key) => [key, bp[key]]);

  const [result] = bpArray.reduce((acc, [name, size]) => {
    if (n === name) return [...acc, `@media (max-width: ${size}px)`];
    return acc;
  }, []);

  return result;
};

export default mq;
