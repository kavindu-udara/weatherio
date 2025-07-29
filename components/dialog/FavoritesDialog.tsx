"use client"
import React, { RefObject } from 'react';
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
import { Button } from '../ui/button';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { setFavorites } from '@/store/favoritesSlice';
import toast from 'react-hot-toast';

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

    const handleDeleteFavorite = (favo: FavoType) => {
        axios.delete("/api/favorite", {
            params: {
                rowId: favo._id
            }
        }).then(response => {
            toast.success(response.data.message);
            fetchFavorites();
        }).catch(err => {
            console.log(err);
        })
    }

    const fetchFavorites = () => {
        axios.get("/api/favorite").then(response => {
            dispatch(setFavorites(response.data.favorites));
        }).catch(err => {
            console.log(err);
        })
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
                            <div className='flex flex-col gap-2'>
                                {favorites?.map(favo => (
                                    <div key={favo._id} className='border p-3 hover:bg-gray-300 rounded-xl cursor-pointer flex  items-center justify-between'>
                                        <div className='w-full' onClick={() => handleChangeLocation(favo)}>{favo.name}</div>
                                        <Button className='cursor-pointer' onClick={() => handleDeleteFavorite(favo)}>
                                            <MdDelete />
                                        </Button>
                                    </div>
                                ))}
                            </div>
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
