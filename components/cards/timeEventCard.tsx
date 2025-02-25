import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TbMoonFilled } from "react-icons/tb";

const TimeEventCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">9 AM</CardTitle>
      </CardHeader>
      <CardContent className="text-6xl flex justify-center">
        <TbMoonFilled />
      </CardContent>
      <CardFooter className=" flex justify-center text-lg">
        <div>
          1 <sup>o</sup>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TimeEventCard;
