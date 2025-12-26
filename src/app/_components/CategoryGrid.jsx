import CategoryCard from "../../components/cards/category/CategoryCard";
import DiscountCard from "../../components/cards/category/DiscountCard";

export default function CategoryGrid({ categories }) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
      {categories?.length > 0 &&
        categories?.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      <DiscountCard />
    </div>
  );
}
