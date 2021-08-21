import currency from 'currency.js';

export const rub = (value) => currency(value, {
  pattern: '# !',
}).format({
  symbol: '₽',
  decimal: ',',
  separator: ' ',
});

