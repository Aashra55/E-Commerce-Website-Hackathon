interface PriceRangeSliderProps {
    min: number; // Minimum value of the slider
    max: number; // Maximum value of the slider
    currentMin: number; // Current minimum value
    currentMax: number; // Current maximum value
    onPriceChange: (min: number, max: number) => void; // Callback function when the price range changes
  }
  
  const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
    min,
    max,
    currentMin,
    currentMax,
    onPriceChange,
  }) => {
    return (
      <div className="flex flex-col items-center gap-4">
        <span className="text-lg font-semibold text-gray-700 w-full text-left">
          ${currentMin}(Min)
        </span>
        <input
          type="range"
          min={min}
          max={max}
          value={currentMin}
          onChange={(e) => onPriceChange(Number(e.target.value), currentMax)}
          className="w-full"
        />
        <span className="text-lg font-semibold text-gray-700 w-full text-left">
          ${currentMax}(Max)
        </span>
        <input
          type="range"
          min={min}
          max={max}
          value={currentMax}
          onChange={(e) => onPriceChange(currentMin, Number(e.target.value))}
          className="w-full"
        />
      </div>
    );
  };
  
  export default PriceRangeSlider;
  
