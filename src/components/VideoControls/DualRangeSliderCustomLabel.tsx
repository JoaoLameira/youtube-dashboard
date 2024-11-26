"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { DualRangeSlider } from "~/components/DualRangeSlider";
import { secondsToMinutes } from "~/utils";

interface DualRangeSliderCustomLabelProps {
  maxDuration: number;
  trimEnd: number;
  trimStart: number;
  onTrimChange: (e: number[]) => void;
}

const DualRangeSliderCustomLabel = ({
  maxDuration,
  trimStart,
  trimEnd,
  onTrimChange,
}: DualRangeSliderCustomLabelProps) => {
  const [values, setValues] = useState([trimStart, trimEnd]);

  const handleLocalStorage = useDebouncedCallback(() => {
    onTrimChange(values);
  }, 600);

  const handleChanges = (values: number[]) => {
    setValues(values);
    handleLocalStorage();
  };

  return (
    <div className="w-full space-y-5 my-10">
      <DualRangeSlider
        label={(value) => {
          const { minutes, remainingSeconds } = secondsToMinutes(value);
          return <span>{`${minutes}:${remainingSeconds}`}</span>;
        }}
        value={values}
        onValueChange={handleChanges}
        min={0}
        max={maxDuration}
        step={1}
      />
    </div>
  );
};
export default DualRangeSliderCustomLabel;
