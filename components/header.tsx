import React from 'react'
import { FaCloudSun } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { Button } from './ui/button';
import { Input } from "@/components/ui/input"

const Header = () => {
  return (
    <header className='grid grid-cols-4 px-10 py-3 border-b'>
        <div className='text-5xl'>
            <FaCloudSun className='cursor-pointer' />
        </div>
        <div className='col-span-2'>
            <Input/>
        </div>
        <div className='text-end'>
            <Button> <FaLocationCrosshairs/> Current Location</Button>
        </div>
    </header>
  )
}

export default Header