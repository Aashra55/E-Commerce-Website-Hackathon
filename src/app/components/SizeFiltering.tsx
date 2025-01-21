import React from "react";

interface SizeFilterProps {
  sizes: string[]; // List of sizes
  selectedSize: string; // Currently selected size
  onSizeChange: (size: string) => void; // Callback to handle size selection
}

// Mapping for readable labels
const sizeLabelMap: Record<string, string> = {
  S: "Small",
  M: "Medium",
  L: "Large",
  XL: "Extra Large",
  XXL: "Extra Extra Large",
};

const SizeFilter: React.FC<SizeFilterProps> = ({
  sizes,
  selectedSize,
  onSizeChange,
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 w-full text-center leading-[50px]">Sizes</h2>
      <div className="flex flex-wrap justify-evenly gap-2">
        {sizes.map((size, index) => (
          <button
            key={index}
            type="button"
            className={`p-2 border rounded hover:bg-orange-600 hover:text-white uppercase ${
              selectedSize === size
                ? "bg-black text-white"
                : "bg-gray-100"
            }`}
            onClick={() => onSizeChange(size)}
          >
            {sizeLabelMap[size] || size} {/* Show mapped label or fallback */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeFilter;
