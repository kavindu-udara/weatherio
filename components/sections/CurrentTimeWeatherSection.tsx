import { convertToCelsius } from '@/lib/temp'
import weatherIconMapping from '@/lib/weatherIconMapping'
import { List, Location } from '@/types'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { getSessionCurrentUser } from '@/lib/session'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { setFavorites } from '@/store/favoritesSlice'

interface Props {
    list: List,
    time: Date,
    displayName: string
}

type UserType = {
    firstName: string,
    lastName: string,
    id: string
}

const CurrentTimeWeatherSection = ({ list, time, displayName }: Props) => {

    const { location } = useSelector((state: RootState) => state.location);

    const dispatch = useDispatch();

    useEffect(() => {
        fetchFavorites();
    }, []);

    const handleAddToFavo = () => {
        if (list && time && location && displayName) {
            axios.post("/api/favorite", {
                name: displayName,
                lat: location.latitude,
                long: location.longitude
            }).then(response => {
                toast.success(response.data.message);
                if (response.status == 200 || response.status == 201) {
                    fetchFavorites();
                }
            }).catch(err => {
                toast.error(err.response.data.message);
            });
        }
    }

    const fetchFavorites = () => {
        axios.get("/api/favorite").then(response => {
            dispatch(setFavorites(response.data.favorites))
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className='flex justify-center flex-col gap-5 h-full'>
            <div className='flex justify-center items-center'>
                <Image src={`./images/weather-icons/animated//${weatherIconMapping[list.weather[0].icon]}`} alt="img" width={400} height={400} />
            </div>
            <div className='text-6xl text-center font-semibold'>
                {convertToCelsius(list.main.temp)}°C
            </div>
            <div className='grid grid-cols-2 gap-5 text-xl'>
                <span className='flex items-center gap-2'>
                    <span className='text-gray-500'>Min: </span>
                    <span className='text-[#559fec] font-semibold'>{convertToCelsius(list.main.temp_min)}°C</span>
                </span>
                <span className='flex items-center gap-2'>
                    <span className='text-gray-500'>Max: </span>
                    <span className='text-red-700 font-semibold'>{convertToCelsius(list.main.temp_max)}°C</span>
                </span>
            </div>
            <div className='flex gap-3 text-xl'>
                {time.toLocaleDateString('en-US', { weekday: 'long' })}, {time.getDate()} {time.toLocaleDateString('en-US', { month: 'long' })} {time.getFullYear()}, {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <hr className='border-gray-600' />
            <ul className='text-lg'>
                <li>{list.weather[0].main} : <span className='text-gray-600'>{list.weather[0].description}</span></li>
            </ul>
            <div className='flex justify-center'>
                <Button onClick={() => handleAddToFavo()}>Add to favorite</Button>
            </div>
        </div>
    )
}

export default CurrentTimeWeatherSection
