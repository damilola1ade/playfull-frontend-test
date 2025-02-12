import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { GamesContextType } from "@/types";

const GamesContext = createContext<GamesContextType | undefined>(undefined);

export const GamesProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [delayedLoading, setDelayedLoading] = useState(true);

  // Get values from the URL
  const searchTerm = searchParams.get("search") || "";
  const selectedGenre = searchParams.get("genre") || "";
  const live = searchParams.get("live") === "true";
  const nonLive = searchParams.get("nonLive") === "true";

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
  const variables: Record<string, string | boolean> = {};
  if (searchTerm) variables.name = `%${searchTerm}%`;
  if (selectedGenre) variables.game_genre = selectedGenre;
  if (live !== nonLive) variables.isLive = live;

  const { loading, data } = useQuery(GET_GAMES, { variables });

  const updateQueryParams = (key: string, value: string | boolean) => {
    const params = new URLSearchParams(searchParams);
    if (value === "" || value === false) {
      params.delete(key);
    } else {
      params.set(key, value.toString());
    }
    setSearchParams(params);
  };

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setDelayedLoading(false), 1500);
      return () => clearTimeout(timer);
    } else {
      setDelayedLoading(true);
    }
  }, [loading]);

  const value = {
    searchTerm,
    selectedGenre,
    live,
    nonLive,
    delayedLoading,
    games: data?.games || [],
    updateQueryParams,
  };

  return (
    <GamesContext.Provider value={value}>{children}</GamesContext.Provider>
  );
};

export const useGames = () => {
  const context = useContext(GamesContext);
  if (context === undefined) {
    throw new Error("useGames must be used within a GamesProvider");
  }
  return context;
};
