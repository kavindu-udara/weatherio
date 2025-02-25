import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { FaWind } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import LevelCard from "./levelCard";
import IndexCard from "./indexCard";

const TodaysHighlightsCard = () => {
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
              <div>
                <FaWind />
              </div>
              <IndexCard title="price" number={3.9} />
              <IndexCard title="price" number={3.9} />
              <IndexCard title="price" number={3.9} />
              <IndexCard title="price" number={3.9} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <LevelCard title="humidity" icon={<WiHumidity />} precent="82%" />
            <LevelCard title="humidity" icon={<WiHumidity />} precent="82%" />
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
                  <FaWind />
                </div>
                <div className="col-span-2 flex flex-col gap-2">
                  <p>Sunrise</p>
                  <div className="uppercase text-4xl">6:46 am</div>
                </div>
              </div>

              {/* sunset */}
              <div className="border rounded gap-5 grid grid-cols-3  p-5">
                <div className="text-6xl">
                  <FaWind />
                </div>
                <div className="col-span-2 flex flex-col gap-2">
                  <p>Sunrise</p>
                  <div className="uppercase text-4xl">6:46 am</div>
                </div>
              </div>

            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <LevelCard title="humidity" icon={<WiHumidity />} precent="82%" />
            <LevelCard title="humidity" icon={<WiHumidity />} precent="82%" />
          </div>
        </div>
        
      </CardContent>
    </Card>
  );
};

export default TodaysHighlightsCard;
