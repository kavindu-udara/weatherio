import React, { RefObject, useEffect, useRef, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { City, List, Location, Response } from '@/types';
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
import dynamic from 'next/dynamic';
import { LocationDetail } from '@/types/location.type';
import axios from 'axios';
import { ImSpinner6 } from "react-icons/im";
import { getLocation } from '@/utils/locationHandler';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '@/store/locationSlice';
import { setDarkTheme, setLighTheme } from '@/store/themeSlice';
import { RootState } from '@/store';

const Map = dynamic(() => import('../Map'), { ssr: false });

const SlideSection = ({ response }: { response: Response }) => {

    const dialogTriggerRef = useRef<HTMLButtonElement>(null);
    const searchDialogTriggerRef = useRef<HTMLButtonElement>(null);

    const [listByTime, setListByTime] = useState<List>(chooseListByTime(response.list));

    const [displayName, setDisplayName] = useState<string>("");
    const { themeStyle } = useSelector((state: RootState) => state.theme);

    const dispatch = useDispatch();

    useEffect(() => {
        const currentList = chooseListByTime(response.list);
        setListByTime(currentList);

        setDisplayName(response.city.name + "," + response.city.country)

        if (currentList.sys.pod) {
            dispatch(currentList.sys.pod === "d" ? setLighTheme() : setDarkTheme());
        }

        const interval = setInterval(() => {
            setListByTime(chooseListByTime(response.list));
        }, 60000);

        return () => clearInterval(interval);
    }, [response]);

    // create a function that run every 1 minute and update the time
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const setCurrentLocation = () => {
        getLocation().then((location) => {
            dispatch(setLocation(location));
        }).catch((error) => {
            console.error("Error retrieving location:", error);
        });
    }

    const locationDivStyle = {
        backgroundImage: "url('/images/location.jpeg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
    }

    return (
        <div className={`${themeStyle} basis-1/3 md:rounded-tl-2xl md:rounded-bl-2xl p-5 flex flex-col justify-stretch`}>

            {/* search bar */}
            <div className='flex items-center md:gap-5 justify-between text-lg'>
                <button className='rounded-full bg-white p-3 text-gray-800 hover:bg-gray-700 hover:text-white' onClick={() => searchDialogTriggerRef?.current?.click()}>
                    <IoSearch />
                </button>
                <button className='rounded-full bg-white p-3 text-gray-800 hover:bg-gray-700 hover:text-white' onClick={() => setCurrentLocation()}>
                    <FaLocationCrosshairs />
                </button>
            </div>

            {/* current time */}
            <CurrentTimeWeatherSection list={listByTime} time={currentTime} displayName={displayName} />

            <div className='rounded-2xl w-full h-[200px] flex items-center justify-center cursor-pointer' onClick={() => dialogTriggerRef?.current?.click()} style={locationDivStyle}>
                <h1 className='text-center text-white text-xl font-semibold'>{displayName}</h1>
            </div>

            <LocationDialog city={response.city} dialogTriggerRef={dialogTriggerRef as RefObject<HTMLButtonElement>} />

            <LocationSelectDialog dialogTriggerRef={searchDialogTriggerRef as RefObject<HTMLButtonElement>} />

        </div>
    )
}

const LocationDialog = ({ city, dialogTriggerRef }: { city: City, dialogTriggerRef: RefObject<HTMLButtonElement> }) => {

    const { themeStyle } = useSelector((state: RootState) => state.theme);

    return (
        <Dialog>
            <DialogTrigger ref={dialogTriggerRef} className='hidden'>Open</DialogTrigger>
            <DialogContent className={`border-none ${themeStyle}`}>
                <DialogHeader>
                    <DialogTitle className='text-center'>{city.name} {city.country}</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Map lat={city.coord.lat} lon={city.coord.lon} />
                </div>

            </DialogContent>
        </Dialog>
    )
}

const LocationSelectDialog = ({ dialogTriggerRef }: { dialogTriggerRef: RefObject<HTMLButtonElement> }) => {

    const [searchText, setSearchText] = useState<string | undefined>();
    const [result, setResult] = useState<LocationDetail[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { themeStyle } = useSelector((state: RootState) => state.theme);

    const dispatch = useDispatch();

    useEffect(() => {
        if (searchText) {
            setIsLoading(true);
            setResult([]);
            axios.get(`${process.env.NEXT_PUBLIC_LOCATION_SEARCH_API_URL!}search?q=${searchText}&format=json&addressdetails=3&limit=5`).then((res) => {
                setResult(res.data);
                setIsLoading(false);
            })
        }
    }, [searchText]);

    const handleSelectLocation = (location: Location) => {
        dispatch(setLocation(location));
        dialogTriggerRef?.current?.click();
    }

    return (
        <Dialog>
            <DialogTrigger ref={dialogTriggerRef} className='hidden'>Open</DialogTrigger>
            <DialogContent className={`border-none ${themeStyle} `}>
                <DialogHeader>
                    <DialogTitle className='text-center'>Search a Place</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <div className='flex flex-col gap-3 p-3'>
                    <input type="text" className='w-full bg-gray-600 p-2 rounded-2xl' value={searchText} onChange={(e) => setSearchText(e.target.value)} />

                    <ul className='w-full flex flex-col gap-3'>
                        {isLoading ? (<div className='w-full flex justify-center py-3'><ImSpinner6 className='animate-spin' /></div>) : result.map((location, index) => (
                            <li className='cursor-pointer' key={index} onClick={() => handleSelectLocation({ latitude: parseFloat(location.lat), longitude: parseFloat(location.lon) })}>{location.display_name}</li>
                        ))}
                    </ul>

                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SlideSection
