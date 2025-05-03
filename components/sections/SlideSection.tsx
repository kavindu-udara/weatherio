import React, { useEffect, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { City, List, Response } from '@/types';
import CurrentTimeWeatherSection from './CurrentTimeWeatherSection';
import { chooseListByTime } from '@/lib/filters';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const SlideSection = ({ response }: { response: Response }) => {

    const dialogTriggerRef = React.useRef<HTMLButtonElement>(null);

    const [themeColor, setThemeColor] = React.useState<string>("bg-white text-black");

    const [listByTime, setListByTime] = useState<List>(chooseListByTime(response.list));

    useEffect(() => {
        if (listByTime.sys.pod) {
            setThemeColor(listByTime.sys.pod === "d" ? "bg-white text-black" : "bg-gray-800 text-white");
        }
        const interval = setInterval(() => {
            setListByTime(chooseListByTime(response.list));
        }, 60000);
        return () => clearInterval(interval);
    }, [response]);

    // create a function that run every 1 minute and update the time
    const [currentTime, setCurrentTime] = React.useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const locationDivStyle = {
        backgroundImage: "url('/images/location.jpeg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
    }

    return (
        <div className={`${themeColor} basis-1/3 rounded-tl-2xl rounded-bl-2xl p-5 flex flex-col justify-stretch`}>

            {/* search bar */}
            <div className='flex items-center gap-5 justify-between text-lg'>
                <div className={`flex items-center gap-3 rounded-2xl px-5 py-2 ${themeColor}`}>
                    <IoSearch />
                    <input type="text" placeholder='Search for places...' className='bg-transparent outline-none' />
                </div>
                <button className='rounded-full bg-white p-3 text-gray-800 hover:bg-gray-700 hover:text-white'>
                    <FaLocationCrosshairs />
                </button>
            </div>

            {/* current time */}
            <CurrentTimeWeatherSection list={listByTime} time={currentTime} />

            <div className='rounded-2xl w-full h-[200px] flex items-center justify-center cursor-pointer' onClick={() => dialogTriggerRef?.current?.click()} style={locationDivStyle}>
                <h1 className='text-center text-white text-xl font-semibold'> {response.city.name}, {response.city.country}</h1>
            </div>

            <LocationDialog city={response.city} dialogTriggerRef={dialogTriggerRef as React.RefObject<HTMLButtonElement>} />

        </div>
    )
}

const LocationDialog = ({ city, dialogTriggerRef }: { city: City, dialogTriggerRef: React.RefObject<HTMLButtonElement> }) => {
    return (
        <Dialog>
            <DialogTrigger ref={dialogTriggerRef} className='hidden'>Open</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-center'>{city.name} {city.country}</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>

                {/* // TODO: create a map to show location */}
                <div>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default SlideSection
