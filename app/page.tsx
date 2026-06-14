import { getTopRated, getTrending } from "@/lib/api";
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
  );
}