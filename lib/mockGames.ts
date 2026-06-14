export interface MockGame {
  id: number;
  title: string;
  image: string;
  rating: number;
  genre: string;
  platform: string;
  releaseYear: number;
  developer: string;
  description: string;
}

export const featuredGames: MockGame[] = [
  {
    id: 1,
    title: "The Legend of Zelda: Tears of the Kingdom",
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=500&h=750&fit=crop",
    rating: 9.6,
    genre: "Action-Adventure",
    platform: "Nintendo Switch",
    releaseYear: 2023,
    developer: "Nintendo EPD",
    description: "An epic adventure across the skies and lands of Hyrule. Craft, build, and explore in this groundbreaking sequel.",
  },
  {
    id: 2,
    title: "Elden Ring",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=750&fit=crop",
    rating: 9.5,
    genre: "Action RPG",
    platform: "PC, PS5, Xbox",
    releaseYear: 2022,
    developer: "FromSoftware",
    description: "A vast open-world action RPG set in the Lands Between, crafted by Hidetaka Miyazaki and George R.R. Martin.",
  },
  {
    id: 3,
    title: "Baldur's Gate 3",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&h=750&fit=crop",
    rating: 9.7,
    genre: "RPG",
    platform: "PC, PS5",
    releaseYear: 2023,
    developer: "Larian Studios",
    description: "A sprawling RPG with deep choice-driven narrative, set in the Dungeons & Dragons universe.",
  },
  {
    id: 4,
    title: "God of War Ragnarök",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=750&fit=crop",
    rating: 9.4,
    genre: "Action-Adventure",
    platform: "PS5, PS4, PC",
    releaseYear: 2022,
    developer: "Santa Monica Studio",
    description: "Kratos and Atreus embark on a mythic journey for answers as Ragnarök approaches in the Norse realms.",
  },
  {
    id: 5,
    title: "Cyberpunk 2077: Phantom Liberty",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&h=750&fit=crop",
    rating: 9.0,
    genre: "Action RPG",
    platform: "PC, PS5, Xbox",
    releaseYear: 2023,
    developer: "CD Projekt Red",
    description: "A thrilling spy-thriller expansion set in the dangerous district of Dogtown in Night City.",
  },
  {
    id: 6,
    title: "Hades II",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=500&h=750&fit=crop",
    rating: 9.2,
    genre: "Roguelike",
    platform: "PC",
    releaseYear: 2024,
    developer: "Supergiant Games",
    description: "Play as Melinoë, the immortal Princess of the Underworld, on a quest to defeat the Titan of Time.",
  },
  {
    id: 7,
    title: "Red Dead Redemption 2",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&h=750&fit=crop",
    rating: 9.8,
    genre: "Action-Adventure",
    platform: "PC, PS4, Xbox",
    releaseYear: 2018,
    developer: "Rockstar Games",
    description: "An epic tale of life in America's unforgiving heartland. Arthur Morgan and the Van der Linde gang.",
  },
  {
    id: 8,
    title: "The Witcher 3: Wild Hunt",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b28?w=500&h=750&fit=crop",
    rating: 9.6,
    genre: "Action RPG",
    platform: "PC, PS5, Xbox, Switch",
    releaseYear: 2015,
    developer: "CD Projekt Red",
    description: "Geralt of Rivia hunts monsters and unravels dark secrets in a war-ravaged open world.",
  },
];

export const upcomingGames: MockGame[] = [
  {
    id: 101,
    title: "GTA VI",
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=500&h=750&fit=crop",
    rating: 0,
    genre: "Action-Adventure",
    platform: "PS5, Xbox Series X",
    releaseYear: 2026,
    developer: "Rockstar Games",
    description: "The next entry in the legendary Grand Theft Auto series, set in a reimagined Vice City.",
  },
  {
    id: 102,
    title: "Hollow Knight: Silksong",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&h=750&fit=crop",
    rating: 0,
    genre: "Metroidvania",
    platform: "PC, Switch",
    releaseYear: 2025,
    developer: "Team Cherry",
    description: "Play as Hornet in a haunting new kingdom filled with deadly creatures and challenging platforming.",
  },
  {
    id: 103,
    title: "The Elder Scrolls VI",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=750&fit=crop",
    rating: 0,
    genre: "RPG",
    platform: "PC, Xbox",
    releaseYear: 2027,
    developer: "Bethesda Game Studios",
    description: "The long-awaited next chapter in the Elder Scrolls saga. Details remain shrouded in mystery.",
  },
  {
    id: 104,
    title: "Metroid Prime 4",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=750&fit=crop",
    rating: 0,
    genre: "Action-Adventure",
    platform: "Nintendo Switch 2",
    releaseYear: 2025,
    developer: "Retro Studios",
    description: "Samus Aran returns in a brand-new first-person adventure in the Metroid Prime series.",
  },
];
