import { convertToCelsius } from '@/lib/temp'
import weatherIconMapping from '@/lib/weatherIconMapping'
import { List } from '@/types'
import Image from 'next/image'
import React from 'react'

interface Props {
    list: List,
    time: Date
}

const CurrentTimeWeatherSection = ({ list, time }: Props) => {
    return (
        <div className='flex justify-center flex-col gap-5 h-full'>
            <div className='flex justify-center items-center'>
                <Image src={`./images/weather-icons/animated//${weatherIconMapping[list.weather[0].icon]}`} alt="img" width={400} height={400}/>
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
        </div>
    )
}

export default CurrentTimeWeatherSection
