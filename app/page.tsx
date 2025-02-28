"use client";
import FiveDayForecastCard from "@/components/cards/fiveDayForecastCard";
import NowCard from "@/components/cards/nowCard";
import TodayAtCard from "@/components/cards/todayAtCard";
import TodaysHighlightsCard from "@/components/cards/todaysHighlightsCard";
import {
  getCurrentLocationWeatherDetailsQueryOption,
  getWeatherDetailsQueryOption,
} from "@/lib/queryOptions";
import { List, Location } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Home: React.FC = () => {
  const [location, setLocation] = useState<Location>();
  const [selectedList, setSelectedList] = useState<List>();

  const weatherQuery = useQuery(
    location
      ? getCurrentLocationWeatherDetailsQueryOption(location, !!location)
      : getWeatherDetailsQueryOption(!location)
  );

  const { data, isPending, error } = weatherQuery;

  const refetch = () => {
    if (location) {
      weatherQuery.refetch();
    }
  };

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          refetch();
        },
        (error) => {
          console.error("Error retrieving location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  if (error) {
    toast("Event has been created.");
  }

  useEffect(() => {
    if (data) {
      setSelectedList(chooseListByTime(data.list));
    }
  }, [data, selectedList]);

  useEffect(() => {
    refetch();
  }, [location]);

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      {isPending && (
        <div className="h-screen flex justify-center items-center">
          Loading...
        </div>
      )}

      {data && selectedList && (
        <div className="flex flex-col justify-center w-full p-5 md:m-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:p-5 md:h-fit ">
            <div className="flex flex-col justify-center gap-5">
              <NowCard city={data.city} list={selectedList} />
              <FiveDayForecastCard lists={data.list} />
            </div>
            <div className="md:col-span-3 flex flex-col gap-3">
              <TodaysHighlightsCard city={data.city} list={selectedList} />
              <TodayAtCard lists={data.list} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const chooseListByTime = (lists: List[]) => {
  if (lists.length === 0) return undefined;

  // Get the current time as a Date object
  const now = new Date();

  // If the current time is before the first forecast, return the first one
  const firstDate = new Date(lists[0].dt_txt);
  if (now < firstDate) return lists[0];

  // Loop through each forecast period (except the last one)
  for (let i = 0; i < lists.length - 1; i++) {
    const start = new Date(lists[i].dt_txt);
    const end = new Date(lists[i + 1].dt_txt);
    if (now >= start && now < end) {
      return lists[i];
    }
  }

  // If current time is later than all forecast start times, return the last forecast
  return lists[lists.length - 1];
};

export default Home;
