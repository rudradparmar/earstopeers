// types/index.ts

export type MediaType = 'movie' | 'tv' | 'anime' | 'game' | 'tech';

export interface ContentItem {
  id: number;
  title: string;
  image: string;
  rating?: number;
  year?: string | number;
  description?: string;
  mediaType: MediaType;
}

/**
 * Represents a TMDB item returned from trending/top-rated/details endpoints.
 * This is a loose type since TMDB returns many optional fields.
 */
export interface TMDBItem {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  backdrop_path?: string;
  overview?: string;
  vote_average?: number;
  media_type?: string;
  release_date?: string;
  first_air_date?: string;
  credits?: {
    cast?: TMDBCastMember[];
  };
  videos?: {
    results?: TMDBVideo[];
  };
  [key: string]: unknown; // allow other TMDB fields
}

export interface TMDBCastMember {
  id: number;
  name: string;
  profile_path: string | null;
  character?: string;
}

export interface TMDBVideo {
  key: string;
  type: string;
  site: string;
  name?: string;
}