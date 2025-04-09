import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Rocket, ShieldCheck, Headphones } from "lucide-react";

import CarouselBanner from "@/components/banner/CarouselBanner";
import CategoryCard from "@/components/cards/CategoryCard";
import ProductCard from "@/components/cards/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Category } from "@/store/types/category.types";
import { useCategory } from "@/store/slices/category.slice";
import { mockProducts } from "@/data/products";
import { mockBanners } from "@/data/banners";
import { ROUTES } from '@/constants/routes';


const Section = ({ children }: { children: React.ReactNode }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.section>
);

export default function Home() {
  const navigate = useNavigate();
  const { categories, fetchCategories, isLoading } = useCategory();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchCategories();
  }, []);

  console.log(categories);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-24">
      <Helmet>
        <title>TechHub | Tecnologia com os melhores preços</title>
        <meta
          name="description"
          content="Encontre notebooks, smartphones, acessórios e mais com descontos incríveis."
        />
      </Helmet>

      {/* Banner principal */}
      <Section>
        <CarouselBanner banners={mockBanners} />
      </Section>

      {/* Categorias */}
      <Section>
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
          Explore por Categoria
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-28 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
            {categories.map((category: Category) => (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <CategoryCard
                  name={category.name}
                  icon={category.icon}
                  onClick={() =>
                    navigate(`/categoria/${category.name.toLowerCase()}`)
                  }
                />
              </motion.div>
            ))}
          </div>
        )}
      </Section>

      {/* Produtos em Destaque */}
      <Section>
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
          Produtos em Destaque
        </h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
          {mockProducts.map((product) => (
            <motion.div
              key={product._id ?? product.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Benefícios da loja */}
      <Section>
        <div className="bg-muted rounded-2xl p-8 text-center shadow-sm">
          <h3 className="text-xl font-semibold mb-3 text-primary">
            Por que comprar conosco?
          </h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Entregamos para todo o Brasil, com garantia estendida, suporte
            personalizado e os melhores preços do mercado.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: Rocket,
                title: "Entrega Rápida",
                desc: "Receba em até 3 dias úteis",
              },
              {
                icon: ShieldCheck,
                title: "Compra Segura",
                desc: "Ambiente 100% criptografado",
              },
              {
                icon: Headphones,
                title: "Suporte 24h",
                desc: "Atendimento via chat e WhatsApp",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                className="bg-background p-4 rounded-lg shadow flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Icon className="text-primary w-6 h-6 mb-2" />
                <p className="font-medium">{title}</p>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Rodapé */}
      <footer className="text-center text-sm text-muted-foreground pt-8">
        © 2025 TechHub. Todos os direitos reservados.
      </footer>
    </div>
  );
}
