import CategoryCard from "../../../components/cards/category/CategoryCard";

export default function CategoryList({ categories }) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
      {categories.map((category, index) => (
        <CategoryCard key={index} category={category} />
      ))}
    </div>
  );
}
