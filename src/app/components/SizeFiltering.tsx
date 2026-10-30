import React from "react";

interface SizeFilterProps {
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

const sizeLabelMap: Record<string, string> = {
  S: "S",
  M: "M",
  L: "L",
  XL: "XL",
  XXL: "2XL",
  All: "All",
};

const SizeFilter: React.FC<SizeFilterProps> = ({
  sizes,
  selectedSize,
  onSizeChange,
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500"></span>
          Select Size
        </h3>
        <span className="text-xs text-slate-400 font-medium">
          {selectedSize === "All" ? "Any" : selectedSize}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {sizes.map((size, index) => {
          const isSelected = selectedSize === size;
          return (
            <button
              key={index}
              type="button"
              className={`min-w-[42px] h-[40px] px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center uppercase ${
                isSelected
                  ? "bg-slate-900 text-white shadow-sm ring-2 ring-orange-500 ring-offset-2 scale-105"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 hover:border-slate-300"
              }`}
              onClick={() => onSizeChange(size)}
            >
              {sizeLabelMap[size] || size}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SizeFilter;
