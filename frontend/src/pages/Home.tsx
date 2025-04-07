import Banner from "@/components/Banner";
import CategoryCard from "@/components/CategoryCard";
import { categories } from "@/data/categories";

const Home = () => {
  return (
    <main className="p-4 max-w-7xl mx-auto">
      <Banner />
      <section>
        <h2 className="text-2xl font-bold mb-4">Categorias</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.name} name={category.name} image={category.image} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
