import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { useGames } from "@/context/GameContext";

export const Searchbar = () => {
  const { searchTerm, updateQueryParams } = useGames();
  const [inputValue, setInputValue] = useState(searchTerm);

  // Debounce effect to delay API call by 1.5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      updateQueryParams("search", inputValue);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [inputValue, updateQueryParams]);

  return (
    <div>
      <p className="text-xs md:text-md font-medium">Search by name</p>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Looking for something?"
        className="mt-2"
      />
    </div>
  );
};
