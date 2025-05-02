import { getCurrentDateTime } from '@/lib/date';
import { chooseListByTime, filterListsByDate } from '@/lib/filters';
import { formatUnixTimeToAMPM } from '@/lib/time';
import { List as WeatherList, Response } from '@/types';
import React, { useEffect } from 'react';
import { FaCircleUp, FaCircleDown } from "react-icons/fa6";
import { RiCompassDiscoverFill } from "react-icons/ri";
import { WiCloudyGusts } from "react-icons/wi";
import { FaCampground } from "react-icons/fa";
import { GiAtSea } from "react-icons/gi";
import Image from 'next/image';
import TimeListCard from '../cards/TimeListCard';

const DetailsSection = ({ response }: { response: Response }) => {

    const [themeColor, setThemeColor] = React.useState<string>("bg-white text-black");
    const [filteredList, setFilteredList] = React.useState<WeatherList[]>();

    useEffect(() => {
        const currentList = chooseListByTime(response.list);
        setThemeColor(currentList.sys.pod === "d" ? "bg-white text-black" : "bg-gray-800 text-white");
        const todayDate = getCurrentDateTime().split(" ")[0];
        
        if (response.list) {
            setFilteredList(filterListsByDate(response.list, todayDate));
        }
    }, [response]);

    return (
        <div className='basis-2/3 blur-bg rounded-tr-2xl rounded-br-2xl p-5 flex flex-col gap-5'>

            <div className='flex justify-between'>
                <div className='flex flex-wrap gap-5 text-2xl font-semibold'>
                    <a href="#" className='underline'>Today</a>
                    <a href="#" className='text-gray-600'>Week</a>
                </div>
            </div>

            <div className='flex flex-wrap gap-5 overflow-x-scroll w-full' style={{ scrollbarWidth: "thin", scrollbarColor: "gray transparent" }}>

                {filteredList && filteredList.length > 0 && filteredList.map((list, index) => (
                    <TimeListCard list={list} themeColor={themeColor} key={index} />
                ))}

            </div>

            <h1 className='text-xl'>Today&apos;s Highlights</h1>

            <div className='grid grid-cols-3 gap-5 min-h-[400px] text-lg'>

                {/* pressure */}
                <div className={`rounded-2xl flex flex-col gap-5 items-center justify-center min-h-[240px] ${themeColor}`}>
                    <span className='text-gray-500'>Pressure</span>
                    <span className='text-4xl font-semibold'>
                        {chooseListByTime(response.list).main.pressure}hPa
                    </span>
                    <div className='flex justify-between items-center text-2xl w-full px-7 text-gray-700 gap-3'>
                        <div className='font-semibold flex items-center gap-5'>
                            <FaCampground className='text-emerald-700'/>
                            {chooseListByTime(response.list).main.grnd_level}
                        </div>
                        <div className='font-semibold flex items-center gap-5'>
                            <GiAtSea className='text-[#559fec]'/>
                            {chooseListByTime(response.list).main.sea_level}
                        </div>
                    </div>
                </div>

                {/* wind status */}
                <div className={`rounded-2xl flex flex-col gap-5 items-center justify-center min-h-[240px] ${themeColor}`}>
                    <span className='text-gray-500'>Wind Status</span>
                    <span className='text-4xl font-semibold'>{chooseListByTime(response.list).wind.speed}m/s</span>
                    <div className='flex justify-between items-center text-2xl w-full px-7 text-gray-700'>
                        <div className='font-semibold flex items-center gap-5'>
                            <RiCompassDiscoverFill className='text-[#559fec]' />
                            {chooseListByTime(response.list).wind.deg}°
                        </div>
                        <div className='font-semibold flex items-center gap-5'>
                            <WiCloudyGusts className='text-[#559fec]' />
                            {chooseListByTime(response.list).wind.gust}m/s
                        </div>
                    </div>
                </div>

                {/* sunrice and sunset */}
                <div className={`rounded-2xl flex flex-col gap-5 items-center justify-center min-h-[240px] ${themeColor}`}>
                    <span className='text-gray-500'>Sunrise and Sunset</span>
                    <div className='text-4xl font-semibold flex items-center gap-5'>
                        <FaCircleUp className='text-[#ffa61c]' />
                        {formatUnixTimeToAMPM(response.city.sunrise)}
                    </div>
                    <div className='text-4xl font-semibold flex items-center gap-5'>
                        <FaCircleDown className='text-[#ffa61c]' />
                        {formatUnixTimeToAMPM(response.city.sunset)}
                    </div>
                </div>

                {/* humidity */}
                <div className={`rounded-2xl flex flex-col gap-5 items-center justify-center min-h-[240px] ${themeColor}`}>
                    <span className='text-gray-500'>Humidity</span>
                    <span className='text-4xl font-semibold'>
                        {chooseListByTime(response.list).main.humidity}%
                    </span>
                    <span>Normal 🤙</span>
                </div>

                {/* visibility */}
                <div className={`rounded-2xl flex flex-col gap-5 items-center justify-center min-h-[240px] ${themeColor}`}>
                    <span className='text-gray-500'>Visibility</span>
                    <span className='text-4xl font-semibold'>
                        {chooseListByTime(response.list).visibility}m
                    </span>
                    <span>Average ☹️</span>
                </div>

                {/* clouds */}
                <div className={`rounded-2xl flex flex-col gap-5 items-center justify-center min-h-[240px] ${themeColor}`}>
                    <span className='text-gray-500'>clouds</span>

                    <Image src="/images/weather-icons/animated/cloudy.svg" alt="cloudy" width={90} height={90} />

                    <span>
                        {
                            chooseListByTime(response.list).clouds.all > 0 ? "Clear Sky ☁️" : chooseListByTime(response.list).clouds.all > 25 ? "Mostly Clear 🌤️" : chooseListByTime(response.list).clouds.all > 50 ? "Party Cloudy" : chooseListByTime(response.list).clouds.all > 75 ? "Mostly Cloudy" : "Overcast"
                        }
                    </span>
                </div>
            </div>

        </div>
    )
}

export default DetailsSection
