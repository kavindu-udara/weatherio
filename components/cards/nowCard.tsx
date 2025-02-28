import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaRegCalendar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { City, List } from "@/types";
import { getCurrentFormattedDate } from "@/lib/date";
import WeatherIcon from "../icons/weatherIcon";

const NowCard = ({ city, list }: { city: City; list: List }) => {
  return (
    <Card className="p-5">
      <CardHeader className="text-2xl">
        <CardTitle>Now</CardTitle>
      </CardHeader>
      <CardContent className="border-b pb-5">
        <div className="text-7xl grid grid-cols-2">
          <div className="text-center">
            {Math.round(list.main.temp - 273.15)}
            <sup>o</sup>c
          </div>
          <div className="flex justify-center">
            {/* <IoCloudyNight /> */}
            <WeatherIcon iconCode={list.weather[0].icon} />
          </div>
        </div>
        <p className="mt-3 text-lg">{list.weather[0].description}</p>
      </CardContent>
      <CardFooter className="text-lg pt-3">
        <div className="flex flex-col gap-3">
          <div className="flex items-center">
            <FaRegCalendar className="mr-3" /> {getCurrentFormattedDate()}
          </div>
          <div className="flex items-center">
            <FaLocationDot className="mr-3" /> {city.name}, {city.country}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NowCard;
