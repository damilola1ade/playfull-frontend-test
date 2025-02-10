import { gql, useQuery } from "@apollo/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { DropdownFilterProps, Genre } from "@/types";

export const DropdownFilter = ({
  selectedGenre,
  setSelectedGenre,
}: DropdownFilterProps) => {
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
    setSelectedGenre(value);
  };

  const clearFilter = () => {
    setSelectedGenre(null);
  };

  return (
    <div className="mt-5">
      <div className="relative flex items-center justify-between">
        <p className="font-medium text-sm text-white">Category</p>
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
