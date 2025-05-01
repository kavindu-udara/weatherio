import React from 'react'
import { FaCloudSun } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { Button } from './ui/button';
import { Input } from "@/components/ui/input"

const Header = () => {
  return (
    <header className='grid gap-5 md:gap-0 md:grid-cols-4 px-10 py-3 blur-bg'>
        <div className='text-5xl flex justify-center'>
            <FaCloudSun className='cursor-pointer' />
        </div>
        <div className='md:col-span-2'>
            <Input/>
        </div>
        <div className='text-center md:text-end'>
            <Button> <FaLocationCrosshairs/> Current Location</Button>
        </div>
    </header>
  )
}

export default Header
