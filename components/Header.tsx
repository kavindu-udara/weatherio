import React, { useRef } from 'react'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Button } from './ui/button';
import { MdOutlineFavorite } from "react-icons/md";
import FavoritesDialog from './dialog/FavoritesDialog';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const Header = () => {

  const favoDialogTriggerBtnRef = useRef<HTMLButtonElement>(null);

    const { themeStyle } = useSelector((state: RootState) => state.theme);

  return (
    <div className={`w-full flex justify-center py-5 border-b ${themeStyle}`}>
      <div className="container flex items-center justify-between">
        <div className='flex items-center'>
          <MdOutlineFavorite size={35} onClick={() => favoDialogTriggerBtnRef.current?.click()} />
          <FavoritesDialog triggerRef={favoDialogTriggerBtnRef}/>
        </div>
        <div className='font-semibold text-2xl'>
          WeatherIO
        </div>
        <div className="flex items-center gap-5">
          <SignedOut>
            <SignInButton />
            <SignUpButton>
              <Button className="cursor-pointer ">
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  )
}

export default Header
