export interface Genre {
  genre_name: string;
}

export interface GlowingCardProps {
  name: string;
  gif: string;
  staticImage: string;
  live: boolean;
  genre: string;
}

export interface Game {
  id: string;
  name: string;
  directory_gif_name: string;
  directory_image_name: string;
  genres: Genre[];
  is_live: boolean;
}

export interface DropdownFilterProps {
  selectedGenre: string | null;
  setSelectedGenre: (genre: string | null) => void;
}
