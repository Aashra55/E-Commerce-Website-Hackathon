import React from "react";

interface CategoryFilterProps {
  categories: string[]; // List of categories
  selectedCategory: string; // Currently selected category
  onCategoryChange: (category: string) => void; // Callback to handle category selection
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 w-full text-center leading-[50px]">Categories</h2>
      <div className="flex md:flex-col gap-2">
        {categories.map((category, index) => (
          <button
            key={index}
            type="button"
            className={`p-2 border rounded uppercase hover:bg-orange-600 hover:text-white ${
              selectedCategory === category
                ? "bg-black text-white"
                : "bg-gray-100"
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
