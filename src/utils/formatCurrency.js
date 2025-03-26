const currency_format = new Intl.NumberFormat("en-NG", {
  currency: "NGN",
  style: "currency",
  maximumFractionDigits: 0,
});

export function formatCurrency(number) {
  return currency_format.format(number);
}

  