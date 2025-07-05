
export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "DKK", name: "Danish Krone", symbol: "kr" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft" },
];

// Mock exchange rates - in a real app, you'd fetch these from an API
const exchangeRates: Record<string, Record<string, number>> = {
  USD: {
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.0,
    CAD: 1.25,
    AUD: 1.35,
    CHF: 0.92,
    CNY: 6.45,
    INR: 74.5,
    BRL: 5.2,
    RUB: 73.5,
    KRW: 1180.0,
    SGD: 1.35,
    HKD: 7.8,
    NOK: 8.5,
    SEK: 8.7,
    DKK: 6.3,
    PLN: 3.9,
    CZK: 21.5,
    HUF: 295.0,
  },
};

// Initialize rates for all currency pairs
currencies.forEach((fromCurrency) => {
  if (!exchangeRates[fromCurrency.code]) {
    exchangeRates[fromCurrency.code] = {};
  }
  
  currencies.forEach((toCurrency) => {
    if (fromCurrency.code === toCurrency.code) {
      exchangeRates[fromCurrency.code][toCurrency.code] = 1.0;
    } else if (!exchangeRates[fromCurrency.code][toCurrency.code]) {
      // Calculate reverse rate if not already defined
      const usdToFrom = exchangeRates.USD[fromCurrency.code] || 1;
      const usdToTo = exchangeRates.USD[toCurrency.code] || 1;
      
      if (fromCurrency.code === "USD") {
        exchangeRates[fromCurrency.code][toCurrency.code] = usdToTo;
      } else if (toCurrency.code === "USD") {
        exchangeRates[fromCurrency.code][toCurrency.code] = 1 / usdToFrom;
      } else {
        exchangeRates[fromCurrency.code][toCurrency.code] = usdToTo / usdToFrom;
      }
    }
  });
});

export const getExchangeRate = (from: string, to: string): number => {
  if (from === to) return 1.0;
  return exchangeRates[from]?.[to] || 1.0;
};
