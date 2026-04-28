// src/app/page.tsx



import { getTopRated } from "@/lib/api";
import { getTrending } from "@/lib/api";
import ContentCard from "@/components/ContentCard";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import TechNews from "@/components/home/TechNews";

export default async function HomePage() {
  const trending = await getTrending();
  const topRated = await getTopRated();

  return (

    <>
      <Hero />
      <Categories />

      <main className="container py-5">
        <h2>Trending</h2>
        <div className="row">
          {trending.slice(0, 8).map((item) => (
            <div className="col-md-3 mb-4" key={item.id}>
              <ContentCard item={item} />
            </div>
          ))}
        </div>

        <h2 className="mt-5">Top Rated</h2>
        <div className="row">
          {topRated.slice(0, 8).map((item) => (
            <div className="col-md-3 mb-4" key={item.id}>
              <ContentCard item={item} />
            </div>
          ))}
        </div>
      </main>
      <TechNews />
    </>


    /*
    <main className="p-6">
      <h2 className="text-xl font-bold mb-4">Trending</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {trending.slice(0, 8).map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>

      <h2 className="text-xl font-bold mt-10 mb-4">Top Rated</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {topRated.slice(0, 8).map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </main>
    */
  );
}

































/*
import ContentCard from "@/components/ContentCard";

const mockData = [
  {
    id: 1,
    title: "Attack on Titan",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500",
    rating: 9.2,
    year: 2023,
    mediaType: "anime",
  },
  {
    id: 2,
    title: "Spider-Man 2",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500",
    rating: 9.1,
    year: 2023,
    mediaType: "game",
  },
];

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        EARSTOPEERS 🎬
      </h1>

      <section>
        <h2 className="text-xl mb-4">Trending</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockData.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              onClick={(id) => console.log("Clicked:", id)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}*/