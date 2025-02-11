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

export interface DropdownFilterProps {
  selectedGenre: string | null;
  setSelectedGenre: (genre: string | null) => void;
}

export interface SearchbarProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
}

export interface SidebarProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  selectedGenre: string | null;
  setSelectedGenre: (genre: string | null) => void;
  live: boolean;
  setLive: (live: boolean) => void;
  nonLive: boolean;
  setNonLive: (nonLive: boolean) => void;
}
