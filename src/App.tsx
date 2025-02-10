import { useQuery, gql } from "@apollo/client";
import { GlowingCard } from "./components/GlowingCard";
import { Sidebar } from "./components/Sidebar";
import { Game } from "./types";
import { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>("");

  const GET_GAMES = gql`
    query GetGames($name: String, $game_genre: game_genre_types_enum) {
      games(
        where: {
          _and: [
            {
              _or: [{ name: { _ilike: $name } }, { name: { _is_null: true } }]
            }
            # Conditionally add genre filter if game_genre is provided
            ${selectedGenre ? `{ genres: { genre_name: { _eq: $game_genre } } }` : ""}
          ]
        }
      ) {
        id
        name
        directory_gif_name
        directory_image_name
        is_live
        genres {
          genre_name
        }
      }
    }
  `;

  const variables: Record<string, string> = {
    name: searchTerm ? `%${searchTerm}%` : "%%",
  };

  if (selectedGenre) {
    variables.game_genre = selectedGenre;
  }

  const { loading, error, data } = useQuery(GET_GAMES, { variables });

  console.log(data)

  return (
    <div className="container mx-auto flex">
      <aside className="h-screen sticky top-0">
        <Sidebar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
      </aside>
      <main className="p-4 flex-1">
        <div className="mt-10 grid lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data?.games?.length > 0 ? (
            data?.games?.map((game: Game) => (
              <GlowingCard
                key={game.id}
                name={game.name}
                gif={game.directory_gif_name}
                staticImage={game.directory_image_name}
                isLive={game.is_live}
                genre={game.genres.map((genre) => genre.genre_name).join(" , ")}
              />
            ))
          ) : (
            <p className="text-white">No game found</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
