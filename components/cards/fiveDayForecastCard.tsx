import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ForecastCard from "./forecastCard";
import { List } from "@/types";
import { filterByUniqueDate } from "@/lib/filters";

const FiveDayForecastCard = ({ lists }: { lists: List[] }) => {
  const [filteredList, setFilteredList] = useState<List[]>([]);

  useEffect(() => {
    setFilteredList(filterByUniqueDate(lists));
  }, [lists]);

  return (
    <div className="flex flex-col gap-5">
      <div className="text-xl md:text-start text-center">5 day forecast</div>
      <Card className="p-5">
        <CardContent className="flex flex-col gap-5 overflow-y-scroll">
          {filteredList.map((list) => (
            <ForecastCard key={list.dt} list={list} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default FiveDayForecastCard;
