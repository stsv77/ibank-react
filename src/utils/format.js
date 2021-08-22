import currency from 'currency.js';

export const rub = (value) => currency(value, {
  pattern: '# !',
}).format({
  symbol: '₽',
  decimal: ',',
  separator: ' ',
});

export const rubMod = (value) => {
  if (value < 0 ) {
    return `-${rub(Math.abs(value))}`;
  }
  return rub(value);
};


