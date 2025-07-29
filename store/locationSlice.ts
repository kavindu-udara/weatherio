import { Location } from "@/types";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
    location: Location | null;
}

const initialState: LocationState = {
    location: null,
};

const locationSlice = createSlice({
    name: 'location',
    initialState, 
    reducers: {
        setLocation(state, action: PayloadAction<Location>) {
            state.location = action.payload;
        },
    },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
