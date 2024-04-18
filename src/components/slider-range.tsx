"use client";
import { Slider } from "./ui/slider";

export default function SliderRange() {
  return (
    <Slider
      className="h-[30px]"
      defaultValue={[33]}
      max={100}
      step={1}
      // onValueChange={(v) => console.log(v)}
    />
  );
}
