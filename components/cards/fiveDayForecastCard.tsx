import React from "react";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import ForecastCard from "./forecastCard";

const FiveDayForecastCard = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-xl">5 day forecast</div>
      <Card className="p-5">
        <CardContent className="flex flex-col gap-5">
          <ForecastCard/>
          <ForecastCard/>
          <ForecastCard/>
        </CardContent>
      </Card>
    </div>
  );
};

export default FiveDayForecastCard;
