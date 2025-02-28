import { Response } from "@/types";
import axios from "axios";

// import res from "@/samples/res.json";

const API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;

export const getWeatherDetails = async (): Promise<Response> => {
    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=${API_KEY}`
    );
    return response.data;

    //! return samplejosn for now - need to delete
    // const transformedRes: Response = {
    //     code: res.cod,
    //     message: res.message,
    //     cnt: res.cnt,
    //     city: res.city,
    //     list: res.list
    // };

    // return transformedRes;
};
