import React from "react";
import TimeEventCard from "./timeEventCard";

const TodayAtCard = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-xl">Today at</div>
      <div className="grid grid-cols-8 gap-5 text-lg">
        <TimeEventCard />
        <TimeEventCard />
        <TimeEventCard />
        <TimeEventCard />
        <TimeEventCard />
        <TimeEventCard />
        <TimeEventCard />
        <TimeEventCard />
      </div>
    </div>
  );
};

export default TodayAtCard;
