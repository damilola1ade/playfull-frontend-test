import { DropdownFilter } from "./DropdownFilter";
import { Searchbar } from "./Searchbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SidebarProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  selectedGenre: string | null;
  setSelectedGenre: (genre: string | null) => void;
}

export const Sidebar = ({
  searchTerm,
  onSearchChange,
  selectedGenre,
  setSelectedGenre,
}: SidebarProps) => {
  return (
    <div className="w-80 h-screen p-10">
      <h4 className="text-white">FILTER</h4>
      <Searchbar searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <DropdownFilter
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
      <div className="mt-5">
        <p className="font-medium text-sm text-white">Live / Non-live</p>
        <Select>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="live">Live</SelectItem>
            <SelectItem value="non-live">Non-live</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
