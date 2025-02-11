/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { GlowingCard } from "./components/GlowingCard";
import { Sidebar } from "./components/Sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Game } from "./types";

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get values from the URL
  const searchTerm = searchParams.get("search") || "";
  const selectedGenre = searchParams.get("genre") || "";
  const live = searchParams.get("live") === "true";
  const nonLive = searchParams.get("nonLive") === "true";

  const [delayedLoading, setDelayedLoading] = useState(true);

  const GET_GAMES = gql`
    query GetGames($name: String, $game_genre: game_genre_types_enum, $isLive: Boolean) {
      games(
        where: {
          _and: [
            ${searchTerm && `{ name: { _ilike: $name } }`}
            ${
              selectedGenre &&
              `{ genres: { genre_name: { _eq: $game_genre } } }`
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

  // Define query variables
  const variables: Record<string, any> = {};

  // Only add `name` if `searchTerm` is not empty
  if (searchTerm) {
    variables.name = `%${searchTerm}%`;
  }

  // Apply `selectedGenre` filter only when needed
  if (selectedGenre) {
    variables.game_genre = selectedGenre;
  }

  // Apply `is_live` filter only when needed
  if (live !== nonLive) {
    variables.isLive = live;
  }

  const { loading, data } = useQuery(GET_GAMES, { variables });

  // Update query parameters
  const updateQueryParams = (key: string, value: string | boolean) => {
    const params = new URLSearchParams(searchParams);

    if (value === "" || value === false) {
      params.delete(key);
    } else {
      params.set(key, value.toString());
    }

    setSearchParams(params);
  };

  // Delay loading to simulate a real world scenario using a skeleton
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setDelayedLoading(false), 1500);
      return () => clearTimeout(timer);
    } else {
      setDelayedLoading(true);
    }
  }, [loading]);

  return (
    <div className="container mx-auto flex flex-col md:flex-row">
      <aside className="h-56 md:h-screen bg-background sticky top-0 z-20 lg:z-0">
        <Sidebar
          searchTerm={searchTerm}
          selectedGenre={selectedGenre}
          live={live}
          nonLive={nonLive}
          onSearchChange={(val) => updateQueryParams("search", val)}
          setSelectedGenre={(val) => updateQueryParams("genre", val || "")}
          setLive={(val) => updateQueryParams("live", val)}
          setNonLive={(val) => updateQueryParams("nonLive", val)}
        />
      </aside>
      <main className="p-4 flex-1">
        <div className="mt-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {delayedLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-60 w-64 rounded-lg bg-gray-700"
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
};
