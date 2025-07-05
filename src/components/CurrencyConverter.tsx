
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, TrendingUp } from "lucide-react";
import CurrencySelector from "./CurrencySelector";
import { currencies, getExchangeRate } from "@/lib/currencyData";

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState("1");
  const [convertedAmount, setConvertedAmount] = useState("0.85");
  const [exchangeRate, setExchangeRate] = useState(0.85);

  useEffect(() => {
    const rate = getExchangeRate(fromCurrency, toCurrency);
    setExchangeRate(rate);
    
    const numAmount = parseFloat(amount) || 0;
    const converted = (numAmount * rate).toFixed(2);
    setConvertedAmount(converted);
  }, [fromCurrency, toCurrency, amount]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="backdrop-blur-lg bg-white/80 shadow-2xl border-0">
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* From Currency */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-700">From</label>
              <CurrencySelector
                value={fromCurrency}
                onChange={setFromCurrency}
              />
              <Input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                className="text-2xl font-semibold h-14 text-center border-2 focus:border-blue-400"
                placeholder="0.00"
              />
            </div>

            {/* Swap Button */}
            <div className="md:hidden flex justify-center">
              <Button
                onClick={handleSwapCurrencies}
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full border-2 hover:bg-blue-50"
              >
                <ArrowUpDown className="h-5 w-5" />
              </Button>
            </div>

            {/* To Currency */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-700">To</label>
              <CurrencySelector
                value={toCurrency}
                onChange={setToCurrency}
              />
              <div className="relative">
                <Input
                  type="text"
                  value={convertedAmount}
                  readOnly
                  className="text-2xl font-semibold h-14 text-center border-2 bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Swap Button for Desktop */}
          <div className="hidden md:flex justify-center mt-4 -mb-4">
            <Button
              onClick={handleSwapCurrencies}
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-2 hover:bg-blue-50 bg-white shadow-lg"
            >
              <ArrowUpDown className="h-5 w-5" />
            </Button>
          </div>

          {/* Exchange Rate Info */}
          <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <TrendingUp className="h-4 w-4" />
              <span>
                1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
              </span>
            </div>
            <p className="text-xs text-center text-gray-500 mt-1">
              Exchange rates are indicative and may vary
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Convert Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {currencies.slice(0, 4).map((currency) => (
          <Card
            key={currency.code}
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 bg-white/60 backdrop-blur-sm"
            onClick={() => setToCurrency(currency.code)}
          >
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">{currency.symbol}</div>
              <div className="font-semibold text-sm">{currency.code}</div>
              <div className="text-xs text-gray-500">{currency.name}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CurrencyConverter;
