export interface Genre {
  game_id: string;
  genre_name: string;
}

export interface GameModuleProps {
  id: string;
  name: string;
  directory_gif_name: string;
  directory_image_name: string;
  genres: Genre[];
  is_live: boolean;
}

export interface GamesContextType {
  searchTerm: string;
  selectedGenre: string;
  live: boolean;
  nonLive: boolean;
  delayedLoading: boolean;
  games: GameModuleProps[];
  updateQueryParams: (key: string, value: string | boolean) => void;
}
