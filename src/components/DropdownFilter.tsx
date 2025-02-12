import { gql, useQuery } from "@apollo/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Genre } from "@/types";
import { useGames } from "@/context/GameContext";

export const DropdownFilter = () => {
  const { selectedGenre, updateQueryParams } = useGames();

  const GET_GENRES = gql`
    query GetGenres {
      game_genres(distinct_on: genre_name) {
        game_id
        genre_name
      }
    }
  `;

  const { data } = useQuery(GET_GENRES);

  const handleChange = (value: string) => {
    console.log("Selected Genre:", value);
    updateQueryParams("genre", value);
  };

  const clearFilter = () => {
    updateQueryParams("genre", "");
  };

  return (
    <div>
      <div className="relative flex items-center justify-between">
        <p className="text-xs md:text-md font-medium">Sort by genre</p>
        {selectedGenre && (
          <Button
            size="sm"
            className="absolute right-0 text-xs"
            onClick={clearFilter}
          >
            Clear filter
          </Button>
        )}
      </div>

      <Select onValueChange={handleChange} value={selectedGenre || ""}>
        <SelectTrigger className="mt-2">
          <SelectValue placeholder="Select Genre" />
        </SelectTrigger>
        <SelectContent>
          {data?.game_genres?.map((item: Genre) => (
            <SelectItem key={item.genre_name} value={item.genre_name}>
              {item.genre_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
