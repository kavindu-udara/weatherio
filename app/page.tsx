"use client"
import DetailsSection from '@/components/sections/DetailsSection'
import SlideSection from '@/components/sections/SlideSection'
import { Location, Response } from '@/types'
import { getLocation } from '@/utils/locationHandler'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Page = () => {

  const [location, setLocation] = useState<Location | null>(null);
  const [response, setResponse] = useState<Response | null>(null);

  useEffect(() => {
    getLocation().then((location) => {
      setLocation(location);
    }).catch((error) => {
      console.error("Error retrieving location:", error);
    });
  }, []);

  useEffect(() => {
    if (location) {
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=d52bc29838fe9de48a040590f6a9e90c`).then((response) => {
        setResponse(response.data);
        console.log("Weather data:", response.data);
      }).catch((error) => {
        console.error("Error fetching weather data:", error);
      })
    }
  }, [location]);

  return response ? (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className='flex flex-row m-10 rounded-2xl min-h-[800px] container'>
        <SlideSection response={response} />
        <DetailsSection response={response} />
      </div>
    </div>
  ) : (
    <div className="h-screen text-white flex flex-col justify-center items-center">
      <p className="p-5 rounded-2xl text-lg">Loading...</p>
      <p >Please allow location permissions</p>
    </div>
  )
}

export default Page
