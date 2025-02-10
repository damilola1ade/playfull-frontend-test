import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { SearchbarProps } from "@/types";

export const Searchbar = ({ searchTerm, onSearchChange }: SearchbarProps) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  // Debounce effect so the API calls after 1.5 seconds.
  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearchChange(inputValue);
    }, 1500);

    return () => clearTimeout(timeout);
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
