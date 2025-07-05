
import CurrencyConverter from "@/components/CurrencyConverter";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Currency Converter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert between world currencies with real-time exchange rates
          </p>
        </div>
        <CurrencyConverter />
      </div>
    </div>
  );
};

export default Index;
