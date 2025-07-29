import { FavoType, Location } from "@/types";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteState {
    favorites: FavoType[] | null;
}

const initialState: FavoriteState = {
    favorites: null,
};

const favoriteslice = createSlice({
    name: 'favorites',
    initialState, 
    reducers: {
        setFavorites(state, action: PayloadAction<FavoType[]>) {
            state.favorites = action.payload;
        },
    },
});

export const { setFavorites } = favoriteslice.actions;
export default favoriteslice.reducer;
