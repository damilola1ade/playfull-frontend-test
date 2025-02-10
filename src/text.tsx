import { useQuery, gql } from "@apollo/client";
import { GlowingCard } from "./components/GlowingCard";
import { Sidebar } from "./components/Sidebar";
import { Game } from "./types";
import { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>("");

  const GET_GAMES = gql`
    query GetGame($name: String, $game_genre: game_genre_types_enum) {
      games(
        where: {
          _or: [
            { name: { _ilike: $name } }
            { name: { _is_null: true } }
            { genres: { genre_name: { _eq: $game_genre } } }
          ]
        }
      ) {
        id
        name
        directory_gif_name
        directory_image_name
        genres {
          genre_name
        }
        is_live
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_GAMES, {
    variables: {
      name: searchTerm ? `%${searchTerm}%` : "",
      game_genre: selectedGenre ? selectedGenre : 'CARD',
    },
  });

  if (loading) return <div className="text-white">Loading...</div>;
  if (error)
    return <div className="text-white">Error, something went wrong</div>;

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
                live={game.is_live}
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
