import { useQuery, gql } from "@apollo/client";
import { GlowingCard } from "./components/GlowingCard";
import { Sidebar } from "./components/Sidebar";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import { Game } from "./types";
import { useEffect, useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>("");
  const [live, setLive] = useState(false);
  const [nonLive, setNonLive] = useState(false);
  const [delayedLoading, setDelayedLoading] = useState(true);

  const GET_GAMES = gql`
    query GetGames($name: String, $game_genre: game_genre_types_enum, $isLive: Boolean) {
      games(
        where: {
          _and: [
            {
              _or: [{ name: { _ilike: $name } }, { name: { _is_null: true } }]
            }
            ${
              selectedGenre
                ? `{ genres: { genre_name: { _eq: $game_genre } } }`
                : ""
            }
            ${live !== nonLive ? `{ is_live: { _eq: $isLive } }` : ""}
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

  const variables: Record<string, any> = {
    name: searchTerm ? `%${searchTerm}%` : "%%",
  };

  if (selectedGenre) {
    variables.game_genre = selectedGenre;
  }

  // Apply `is_live` filter only when needed
  if (live !== nonLive) {
    variables.isLive = live;
  }

  const { loading, data } = useQuery(GET_GAMES, { variables });

  // Add a 2-second delay to simulate real loading
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setDelayedLoading(false), 2000);
      return () => clearTimeout(timer);
    } else {
      setDelayedLoading(true);
    }
  }, [loading]);

  return (
    <div className="container mx-auto flex flex-col md:flex-row">
      <aside className="h-44 md:h-screen bg-background sticky top-0 z-20 lg:z-0">
        <Sidebar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          live={live}
          setLive={setLive}
          nonLive={nonLive}
          setNonLive={setNonLive}
        />
      </aside>
      <main className="p-3 flex-1">
        <div className="mt-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {delayedLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-60 lg:w-64 rounded-lg bg-gray-700"
              />
            ))
          ) : data?.games?.length > 0 ? (
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
            <p>No game found</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
