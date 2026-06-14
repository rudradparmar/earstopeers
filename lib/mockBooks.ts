export interface MockBook {
  id: number;
  title: string;
  author: string;
  image: string;
  rating: number;
  genre: string;
  year: number;
  pages: number;
  description: string;
}

export const featuredBooks: MockBook[] = [
  {
    id: 1,
    title: "Dune",
    author: "Frank Herbert",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=750&fit=crop",
    rating: 9.4,
    genre: "Science Fiction",
    year: 1965,
    pages: 688,
    description: "Set on the desert planet Arrakis, a young nobleman becomes the leader of a revolution that will reshape the universe.",
  },
  {
    id: 2,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=750&fit=crop",
    rating: 9.7,
    genre: "Fantasy",
    year: 1954,
    pages: 1178,
    description: "An epic journey to destroy the One Ring and save Middle-earth from the Dark Lord Sauron.",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=500&h=750&fit=crop",
    rating: 9.3,
    genre: "Dystopian",
    year: 1949,
    pages: 328,
    description: "A haunting vision of a totalitarian future where Big Brother watches every move and thought crime is death.",
  },
  {
    id: 4,
    title: "Project Hail Mary",
    author: "Andy Weir",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&h=750&fit=crop",
    rating: 9.5,
    genre: "Science Fiction",
    year: 2021,
    pages: 496,
    description: "A lone astronaut must save Earth from disaster. His only companion is an alien from another star system.",
  },
  {
    id: 5,
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&h=750&fit=crop",
    rating: 9.1,
    genre: "Sci-Fi Comedy",
    year: 1979,
    pages: 224,
    description: "Arthur Dent's ordinary life is upended when Earth is demolished to make way for a hyperspace bypass.",
  },
  {
    id: 6,
    title: "Atomic Habits",
    author: "James Clear",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&h=750&fit=crop",
    rating: 9.0,
    genre: "Self-Help",
    year: 2018,
    pages: 320,
    description: "A proven framework for improving every day. Learn how tiny changes in behavior lead to remarkable results.",
  },
  {
    id: 7,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&h=750&fit=crop",
    rating: 9.2,
    genre: "Non-Fiction",
    year: 2011,
    pages: 464,
    description: "A sweeping narrative of humanity's creation and evolution, from the Stone Age to the Silicon Age.",
  },
  {
    id: 8,
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=500&h=750&fit=crop",
    rating: 9.3,
    genre: "Fantasy",
    year: 2007,
    pages: 662,
    description: "Kvothe, the legendary figure, tells his own story — of a childhood in a troupe of traveling players to years spent as a fugitive.",
  },
];

export const classicBooks: MockBook[] = [
  {
    id: 101,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=750&fit=crop",
    rating: 9.1,
    genre: "Classic Fiction",
    year: 1960,
    pages: 281,
    description: "A gripping portrayal of racial injustice in the American South, seen through the eyes of a young girl.",
  },
  {
    id: 102,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=750&fit=crop",
    rating: 8.9,
    genre: "Romance",
    year: 1813,
    pages: 432,
    description: "The story of Elizabeth Bennet as she navigates love, society, and the proud Mr. Darcy.",
  },
  {
    id: 103,
    title: "Brave New World",
    author: "Aldous Huxley",
    image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=500&h=750&fit=crop",
    rating: 8.8,
    genre: "Dystopian",
    year: 1932,
    pages: 311,
    description: "A chilling vision of a future society driven by technology, conditioning, and the pursuit of pleasure.",
  },
  {
    id: 104,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&h=750&fit=crop",
    rating: 8.7,
    genre: "Classic Fiction",
    year: 1925,
    pages: 180,
    description: "The decadence and excess of the Jazz Age, told through the mysterious millionaire Jay Gatsby.",
  },
];
