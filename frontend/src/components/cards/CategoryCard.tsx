import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

type CategoryCardProps = {
  name: string;
  icon: string;
  onClick?: () => void;
};

export default function CategoryCard({ name, icon, onClick }: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className="border border-border bg-secondary/90 hover:border-primary transition-colors duration-200 shadow-sm hover:shadow-lg min-h-[180px]">
  <CardContent className="flex flex-col items-center justify-center py-6 px-4 space-y-4">
    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-muted/70 shadow-inner">
      <img
        src={icon}
        alt={`Ícone da categoria ${name}`}
        className="w-8 h-8 object-contain"
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/fallback-category.png";
        }}
      />
    </div>

    <p className="text-sm md:text-base font-medium text-center text-white">
      {name}
    </p>
  </CardContent>
</Card>
    </motion.div>
  );
}
