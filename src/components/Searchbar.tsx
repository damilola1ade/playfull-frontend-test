import { useState, useEffect } from "react";
import { Input } from "./ui/input";

interface SearchbarProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
}

export const Searchbar = ({ searchTerm, onSearchChange }: SearchbarProps) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  // Debounce effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearchChange(inputValue);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [inputValue, onSearchChange]);

  return (
    <div>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Looking for something?"
        className="mt-5"
      />
    </div>
  );
};
