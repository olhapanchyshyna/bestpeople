"use client";

import { useCustomHook } from "@/lib/hooks";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import ButtonCustom from "./button";

const StyledSlider = styled(Slider)(({ theme }) => ({
  width: "90%",
  margin: "0 auto",
  display: "flex",

  "& .MuiSlider-thumb": {
    color: "white",
    border: "2px solid #B3DB11",
    boxShadow: "0 0 2px 0px rgba(0, 0, 0, 0.1)",
    "&:focus, &:hover, &.Mui-active": {
      boxShadow: "0px 0px 3px 1px rgba(0, 0, 0, 0.1)",
    },
    "&::after": {
      width: 22,
      height: 22,
    },
  },
  "& .MuiSlider-track": {
    color: "#B3DB11",
  },
  "& .MuiSlider-rail": {
    color: "#4d4d4d",
  },
}));

function valuetext(value: number) {
  return `${value}°C`;
}

const minDistance = 10;

export default function SliderDistance() {
  const searchParams = useSearchParams();
  const [value1, setValue1] = React.useState<number[]>([4, 140]);
  const { handleTakePrise } = useCustomHook();

  useEffect(() => {
    setValue1([
      searchParams.get("min") ? Number(searchParams.get("min")) : 4,
      searchParams.get("max") ? Number(searchParams.get("max")) : 140,
    ]);
  }, [searchParams]);

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const formatValues = (values: number[]): string => {
    const formattedStart = values[0].toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    const formattedEnd = values[1].toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    return `${formattedStart} — ${formattedEnd}`;
  };

  return (
    <>
      <StyledSlider
        min={0}
        max={140}
        getAriaLabel={() => "Minimum distance"}
        value={value1}
        onChange={handleChange1}
        valueLabelDisplay="off"
        getAriaValueText={valuetext}
        disableSwap
      />
      <div className="mt-[10px] flex items-center justify-between">
        <div>{formatValues(value1)}</div>
        <ButtonCustom
          onClick={() => {
            handleTakePrise(String(value1[0]), String(value1[1]));
          }}
          text="Ok"
          href=""
          className="h-[30px] px-[10px] py-[5px]"
        />
      </div>
    </>
  );
}
