import React from "react";
import { TbMoonFilled } from "react-icons/tb";

const ForecastCard = () => {
  return (
    <div className="grid grid-cols-3 text-lg">
      <div className="flex gap-2 items-center text-3xl">
        <TbMoonFilled />5
      </div>
      <div className="text-center">2 Mar</div>
      <div className="text-end">Thursday</div>
    </div>
  );
};

export default ForecastCard;
