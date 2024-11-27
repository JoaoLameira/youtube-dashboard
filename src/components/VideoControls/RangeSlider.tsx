/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useAtom } from "jotai";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { DualRangeSlider } from "~/components/DualRangeSlider";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import { trimEndAtom, trimStartAtom } from "~/store";
import { secondsToMinutes } from "~/utils";

const DualRangeSliderCustomLabel = ({
  maxDuration,
}: {
  maxDuration: number;
}) => {
  const [trimStart, setTrimStart] = useAtom(trimStartAtom);
  const [trimEnd, setTrimEnd] = useAtom(trimEndAtom);
  const { setItem, getItem } = useLocalStorage();
  const { videoId }: { videoId: string } = useParams();

  useEffect(() => {
    const getTrimStart = getItem<number | undefined>(`trimStart-${videoId}`);
    const getTrimEnd = getItem<number | undefined>(`trimEnd-${videoId}`);
    setTrimStart(getTrimStart);
    setTrimEnd(getTrimEnd);
  }, []);

  const handleChanges = (values: number[]) => {
    setTrimStart(values[0]);
    setTrimEnd(values[1]);
    setItem<number>(`trimStart-${videoId}`, values[0]);
    setItem<number>(`trimEnd-${videoId}`, values[1]);
  };

  return (
    <div className="w-full space-y-5 my-10">
      <DualRangeSlider
        label={(value) => {
          const { minutes, remainingSeconds } = secondsToMinutes(value);
          return <span>{`${minutes}:${remainingSeconds}`}</span>;
        }}
        value={[trimStart || 0, trimEnd || maxDuration]}
        onValueChange={handleChanges}
        min={0}
        max={maxDuration}
        step={1}
      />
    </div>
  );
};
export default DualRangeSliderCustomLabel;
