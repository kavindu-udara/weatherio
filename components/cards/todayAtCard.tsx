import React, { useEffect, useState } from "react";
import TimeEventCard from "./timeEventCard";
import { List } from "@/types";
import { filterListsByDate } from "@/lib/filters";
import { getCurrentDateTime } from "@/lib/date";

const TodayAtCard = ({lists} : {lists: List[]}) => {


  const [filteredList, setFilteredList] = useState<List[]>();

  const todayDate = getCurrentDateTime().split(" ")[0];

  useEffect(() => {
      setFilteredList(filterListsByDate(lists, todayDate));
  }, [lists, todayDate]);

  return (
    <div className="flex flex-col gap-3">
      <div className="text-xl">Today at</div>
      <div className="grid grid-cols-8 gap-5 text-lg">
        { filteredList &&
          filteredList.map(list => (
            <TimeEventCard list={list} key={list.dt} />
          ))
        }
      </div>
    </div>
  );
};

export default TodayAtCard;
