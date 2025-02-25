import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoCloudyNight } from "react-icons/io5";
import { FaRegCalendar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const NowCard = () => {
  return (
    <Card className="p-5">
      <CardHeader className="text-2xl">
        <CardTitle>Now</CardTitle>
      </CardHeader>
      <CardContent className="border-b pb-5">
        <div className="text-7xl grid grid-cols-2">
          <div className="text-center">
            5<sup>o</sup>c
          </div>
          <div className="flex justify-center">
            <IoCloudyNight />
          </div>
        </div>
        <p className="mt-3 text-lg">Broken Clouds</p>
      </CardContent>
      <CardFooter className="text-lg pt-3">
        <div className="flex flex-col gap-3">
          <div className="flex items-center">
            <FaRegCalendar className="mr-3" /> Wednesday 1, Mar
          </div>
          <div className="flex items-center">
            <FaLocationDot className="mr-3" /> London, GB
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NowCard;
