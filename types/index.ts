// src/types/index.ts

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