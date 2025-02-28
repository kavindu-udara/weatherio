import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { List } from "@/types";
import WeatherIcon from "../icons/weatherIcon";
import { convertTo12HourFormat } from "@/lib/date";

const TimeEventCard = ({ list }: { list: List }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">
          {convertTo12HourFormat(list.dt_txt)}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-6xl flex justify-center">
        <WeatherIcon iconCode={list.weather[0].icon} />
      </CardContent>
      <CardFooter className=" flex justify-center text-lg">
        <div>
          {Math.round(list.main.temp - 273.15)} <sup>o</sup>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TimeEventCard;
