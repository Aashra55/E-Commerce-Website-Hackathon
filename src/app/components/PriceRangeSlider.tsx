import React from "react";

interface PriceRangeSliderProps {
  min: number;
  max: number;
  currentMin: number;
  currentMax: number;
  onPriceChange: (min: number, max: number) => void;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min,
  max,
  currentMin,
  currentMax,
  onPriceChange,
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500"></span>
          Price Range
        </h3>
        <span className="text-xs text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded-full">
          ${currentMin} - ${currentMax}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Minimum Price</span>
            <span className="font-semibold text-slate-800">${currentMin}</span>
          </div>
          <input
            type="range"
            min={min}
            max={max}
            value={currentMin}
            onChange={(e) => {
              const val = Math.min(Number(e.target.value), currentMax - 5);
              onPriceChange(val, currentMax);
            }}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Maximum Price</span>
            <span className="font-semibold text-slate-800">${currentMax}</span>
          </div>
          <input
            type="range"
            min={min}
            max={max}
            value={currentMax}
            onChange={(e) => {
              const val = Math.max(Number(e.target.value), currentMin + 5);
              onPriceChange(currentMin, val);
            }}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
          />
        </div>

        {/* Quick Presets */}
        <div className="pt-2 flex flex-wrap gap-1.5">
          {[
            { label: "Under $50", min: 0, max: 50 },
            { label: "$50 - $150", min: 50, max: 150 },
            { label: "$150 - $300", min: 150, max: 300 },
            { label: "All Prices", min: 0, max: 500 },
          ].map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onPriceChange(preset.min, preset.max)}
              className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-orange-50 hover:text-orange-600 text-slate-600 border border-slate-200/80 transition"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
