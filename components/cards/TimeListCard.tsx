import { convertTo12HourFormat } from '@/lib/date'
import { convertToCelsius } from '@/lib/temp'
import weatherIconMapping from '@/lib/weatherIconMapping'
import { List } from '@/types'
import Image from 'next/image'
import React from 'react'

interface Props{
    list: List;
    themeColor: string;
}

const TimeListCard = ({list, themeColor} : Props) => {
    return (
        <div className={`flex flex-col gap-2 p-5 rounded-2xl font-semibold items-center ${themeColor}`}>
            <span>{convertTo12HourFormat(list.dt_txt)}</span>
            <Image src={"/images/weather-icons/animated/" + weatherIconMapping[list.weather[0].icon]} width={100} height={100} alt="weather-img" />
            <span>{convertToCelsius(list.main.temp)}°C</span>
        </div>
    )
}

export default TimeListCard
