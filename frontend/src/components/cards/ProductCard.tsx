import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type Product = {
  name: string;
  image: string;
  price: number;
  link?: string;
};

type ProductCardProps = {
  product: Product;
  onClick?: () => void;
};

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const handleClick = () => {
    if (product.link) {
      window.open(product.link, "_blank");
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
    >
      <Card className="overflow-hidden rounded-2xl shadow-lg transition cursor-pointer hover:shadow-2xl bg-secondary/90 border border-border min-h-[340px]">
  <div className="relative aspect-[4/3] overflow-hidden">
    <motion.img
      src={product.image}
      alt={`Imagem do produto ${product.name}`}
      className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
      loading="lazy"
      onError={(e) => {
        (e.target as HTMLImageElement).src = "/fallback.jpg";
      }}
    />
  </div>

  <CardContent className="p-4 flex flex-col gap-2 text-muted-foreground">
    <h3 className="text-base font-semibold text-white truncate">
      {product.name}
    </h3>

    <p className="text-lg font-bold text-primary">
      R$ {product.price.toFixed(2)}
    </p>

    {product.link ? (
      <Button
        asChild
        variant="secondary"
        className="mt-2 hover:bg-primary hover:text-white"
        onClick={(e) => e.stopPropagation()}
        aria-label={`Ver mais detalhes sobre ${product.name}`}
      >
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver no site
        </a>
      </Button>
    ) : (
      <p className="text-xs text-muted-foreground mt-2">
        Clique para ver detalhes
      </p>
    )}
  </CardContent>
</Card>

    </motion.div>
  );
}
