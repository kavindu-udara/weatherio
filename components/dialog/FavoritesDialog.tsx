"use client"
import React, { RefObject} from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '@/store/locationSlice';
import { FavoType } from '@/types';
import { RootState } from '@/store';


const FavoritesDialog = ({ triggerRef }: { triggerRef: RefObject<HTMLButtonElement | null> }) => {

    const dispatch = useDispatch();

    const { favorites } = useSelector((state: RootState) => state.favorites);

    const handleChangeLocation = (favo: FavoType) => {
        dispatch(setLocation({
            latitude: favo.latitude,
            longitude: favo.longitude
        }));
        triggerRef.current?.click();
    }

    return (
        <Dialog>
            <DialogTrigger ref={triggerRef} className='hidden'>Open</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Favorites</DialogTitle>
                    <DialogDescription>
                        Your favorite locations
                    </DialogDescription>
                    {
                        favorites ? (
                            <ul className='flex flex-col gap-2'>
                                {favorites?.map(favo => (
                                    <li key={favo._id} onClick={() => handleChangeLocation(favo)} className='border p-3 hover:bg-gray-300 rounded-xl cursor-pointer'>{favo.name}</li>
                                ))}
                            </ul>
                        )
                            :
                            (
                                <div className='flex justify-center items-center'>
                                    No favorites Available
                                </div>
                            )
                    }

                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default FavoritesDialog;
