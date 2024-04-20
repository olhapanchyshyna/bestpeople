"use client";

import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import React from "react";

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
  const [value1, setValue1] = React.useState<number[]>([25, 100]);

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
        className=""
      />
      <div>{formatValues(value1)}</div>
    </>
  );
}
