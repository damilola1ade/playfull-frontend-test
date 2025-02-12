import { DropdownFilter } from "./DropdownFilter";
import { Searchbar } from "./Searchbar";
import { Checkbox } from "./ui/checkbox";
import { useGames } from "@/context/GameContext";

export const Sidebar = () => {
  const { live, nonLive, updateQueryParams } = useGames();

  return (
    <div className="lg:w-80 h-screen gap-4 p-4 md:p-10">
      <h4 className="">FILTER</h4>
      <div className="mt-5 grid grid-cols-2 lg:grid-cols-1 gap-4">
        <Searchbar />
        <DropdownFilter />
        <div className="flex gap-1">
          <Checkbox
            checked={live}
            onCheckedChange={(checked) => updateQueryParams("live", !!checked)}
          />
          <p>Live</p>
        </div>
        <div className="flex gap-1">
          <Checkbox
            checked={nonLive}
            onCheckedChange={(checked) =>
              updateQueryParams("nonLive", !!checked)
            }
          />
          <p>Non-live</p>
        </div>
      </div>
    </div>
  );
};
