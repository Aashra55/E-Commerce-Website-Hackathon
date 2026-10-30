import React from "react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500"></span>
          Categories
        </h3>
        <span className="text-xs text-slate-400 font-medium">
          {categories.length} Total
        </span>
      </div>

      <div className="flex flex-wrap md:flex-col gap-1.5">
        {categories.map((category, index) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={index}
              type="button"
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 text-left ${
                isSelected
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xs font-semibold translate-x-1"
                  : "bg-slate-50/80 hover:bg-slate-100 text-slate-700 hover:text-slate-900"
              }`}
              onClick={() => onCategoryChange(category)}
            >
              <span className="capitalize">{category}</span>
              {isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
