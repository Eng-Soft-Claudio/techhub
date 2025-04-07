interface CategoryCardProps {
    name: string;
    image: string;
  }
  
  const CategoryCard = ({ name, image }: CategoryCardProps) => {
    return (
      <div className="rounded-2xl overflow-hidden shadow-md bg-white hover:scale-105 transition-transform cursor-pointer">
        <img src={image} alt={name} className="w-full h-40 object-cover" />
        <div className="p-4 text-center">
          <h2 className="text-lg font-semibold">{name}</h2>
        </div>
      </div>
    );
  };
  
  export default CategoryCard;
  