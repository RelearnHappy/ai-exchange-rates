
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { currencies } from "@/lib/currencyData";

interface CurrencySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const CurrencySelector = ({ value, onChange }: CurrencySelectorProps) => {
  const [open, setOpen] = useState(false);

  const selectedCurrency = currencies.find((currency) => currency.code === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-14 text-left font-semibold border-2 hover:border-blue-400"
        >
          <div className="flex items-center space-x-3">
            <span className="text-xl">{selectedCurrency?.symbol}</span>
            <div>
              <div className="font-semibold">{selectedCurrency?.code}</div>
              <div className="text-xs text-gray-500">{selectedCurrency?.name}</div>
            </div>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-white border-2 shadow-xl" align="start">
        <Command>
          <CommandInput placeholder="Search currency..." />
          <CommandList>
            <CommandEmpty>No currency found.</CommandEmpty>
            <CommandGroup>
              {currencies.map((currency) => (
                <CommandItem
                  key={currency.code}
                  value={currency.code}
                  onSelect={(currentValue) => {
                    onChange(currentValue.toUpperCase());
                    setOpen(false);
                  }}
                  className="cursor-pointer hover:bg-blue-50"
                >
                  <div className="flex items-center space-x-3 w-full">
                    <span className="text-lg">{currency.symbol}</span>
                    <div className="flex-1">
                      <div className="font-semibold">{currency.code}</div>
                      <div className="text-xs text-gray-500">{currency.name}</div>
                    </div>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === currency.code ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CurrencySelector;
