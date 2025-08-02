"use client"
import DetailsSection from '@/components/sections/DetailsSection';
import SlideSection from '@/components/sections/SlideSection';
import { backgroundImageMapping } from '@/lib/backgroundImageMapping';
import { chooseListByTime } from '@/lib/filters';
import { RootState } from '@/store';
import { setLocation } from '@/store/locationSlice';
import {Response } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {

  const [response, setResponse] = useState<Response | null>(null);

  const { location } = useSelector((state: RootState) => state.location);

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setLocation({
      latitude: 7.2143,
      longitude: 80.6401
    }));
  }, []);

  useEffect(() => {
    if (location) {
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`).then((response) => {
        setResponse(response.data);
        console.log("Weather data:", response.data);
      }).catch((error) => {
        console.error("Error fetching weather data:", error);
      })
    }
  }, [location]);

  const pageStyle = {
    backgroundImage: `url("/images/backgrounds/${response ? backgroundImageMapping[chooseListByTime(response?.list).weather[0].icon] : "/images/background.jpg"} ")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }

  return response ? (
    <div className="w-full min-h-screen flex justify-center items-center" style={pageStyle}>
      <div className='flex flex-col md:flex-row md:m-10 md:rounded-2xl min-h-[800px] container'>
        <SlideSection response={response}/>
        <DetailsSection response={response} />
      </div>
    </div>
  ) : (
    <div className="h-screen text-gray-700 flex flex-col justify-center items-center">
      <p className="p-5 rounded-2xl text-lg">Loading...</p>
      <p >Please allow location permissions</p>
    </div>
  )
}

// page