import { SidebarProps } from "@/types";
import { DropdownFilter } from "./DropdownFilter";
import { Searchbar } from "./Searchbar";
import { Checkbox } from "./ui/checkbox";

export const Sidebar = ({
  searchTerm,
  onSearchChange,
  selectedGenre,
  setSelectedGenre,
  live,
  nonLive,
  setLive,
  setNonLive,
}: SidebarProps) => {
  return (
    <div className="lg:w-80 h-screen gap-4 p-4 md:p-10">
      <h4 className="">FILTER</h4>
      <div className="mt-5 grid grid-cols-2 lg:grid-cols-1 gap-4">
        <Searchbar searchTerm={searchTerm} onSearchChange={onSearchChange} />
        <DropdownFilter
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
        <div className="flex gap-1">
          <Checkbox
            checked={live}
            onCheckedChange={(checked) => setLive(!!checked)}
          />
          <p>Live</p>
        </div>
        <div className="flex gap-1">
          <Checkbox
            checked={nonLive}
            onCheckedChange={(checked) => setNonLive(!!checked)}
          />
          <p>Non-live</p>
        </div>
      </div>
    </div>
  );
};
