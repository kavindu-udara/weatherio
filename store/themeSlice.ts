import { createSlice } from '@reduxjs/toolkit';

interface ThemeSliceType {
    themeStyle: string ;
}

const initialState: ThemeSliceType = {
    themeStyle: "bg-white text-black",
};

const themeSlice = createSlice({
    name: 'theme',
    initialState, 
    reducers: {
        setLighTheme(state) {
            state.themeStyle = "bg-white text-black";
        },
        setDarkTheme(state) {
            state.themeStyle = "bg-gray-800 text-white";
        },
    },
});

export const { setLighTheme, setDarkTheme } = themeSlice.actions;
export default themeSlice.reducer;
