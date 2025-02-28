import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { FaWind } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import LevelCard from "./levelCard";
import IndexCard from "./indexCard";
import { City, List } from "@/types";
import { LuWaves } from "react-icons/lu";
import { IoEyeOutline } from "react-icons/io5";
import { FaTemperatureHalf } from "react-icons/fa6";
import { convertTimestampToTime } from "@/lib/date";
import { FiSun } from "react-icons/fi";
import { LuMoon } from "react-icons/lu";

const TodaysHighlightsCard = ({ city, list }: { city: City; list: List }) => {
  return (
    <Card className="p-5">
      <CardHeader className="text-2xl">
        <CardTitle>Todays Highlights</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-5">
        <div className="grid grid-rows-2 gap-5">
          <div className="flex flex-col gap-5 border p-5 rounded-lg">
            <div className="flex justify-between">
              <p>Air quality index</p>
              <Button>Good</Button>
            </div>
            <div className="grid grid-cols-5 gap-3 text-6xl">
              <div className="flex items-center justify-center">
                <FaWind />
              </div>
              <IndexCard title="price" number={3.9} />
              <IndexCard title="price" number={3.9} />
              <IndexCard title="price" number={3.9} />
              <IndexCard title="price" number={3.9} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <LevelCard
              title="Humidity"
              icon={<WiHumidity />}
              precent={`${list.main.humidity}%`}
            />
            <LevelCard
              title="Pressure"
              icon={<LuWaves />}
              precent={`${list.main.pressure}hPa`}
            />
          </div>
        </div>

        <div className="grid grid-rows-2 gap-5">
          <div className="flex flex-col gap-5 border p-5 rounded-lg">
            <div className="flex ">
              <p>sunrice & sunset</p>
            </div>
            <div className="grid grid-cols-2 gap-3 ">
              <div className="border rounded gap-5 grid grid-cols-3  p-5">
                <div className="text-6xl">
                  <FiSun />
                </div>
                <div className="col-span-2 flex flex-col gap-2">
                  <p>Sunrise</p>
                  <div className="uppercase text-4xl">
                    {convertTimestampToTime(city.sunrise)}
                  </div>
                </div>
              </div>

              {/* sunset */}
              <div className="border rounded gap-5 grid grid-cols-3  p-5">
                <div className="text-6xl">
                  <LuMoon />
                </div>
                <div className="col-span-2 flex flex-col gap-2">
                  <p>Sunrise</p>
                  <div className="uppercase text-4xl">
                    {convertTimestampToTime(city.sunset)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <LevelCard
              title="Visibility"
              icon={<IoEyeOutline />}
              precent={`${Math.round(list.visibility / 1000)}km`}
            />
            <LevelCard
              title="Feels like"
              icon={<FaTemperatureHalf />}
              precent={`${Math.round(list.main.feels_like - 273.15)}`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaysHighlightsCard;
