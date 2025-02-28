import { List } from "@/types";
import React from "react";
import WeatherIcon from "../icons/weatherIcon";

const ForecastCard = ({ list }: { list: List }) => {
  return (
    <div className="grid grid-cols-3 md:text-lg">
      <div className="flex gap-2 items-center text-xl md:text-3xl">
        <WeatherIcon iconCode={list.weather[0].icon} />
        {Math.round(list.main.temp - 273.15)}
        <sup>o</sup>
      </div>
      <div className="text-center">{list.dt_txt.split(" ")[0]}</div>
      <div className="text-end">Thursday</div>
    </div>
  );
};

export default ForecastCard;
