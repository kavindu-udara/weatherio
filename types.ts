export interface City {
    id: number;
    name: string;
    coord: {
        lat: number;
        lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number
}

export interface Weather {
    id: number;
    main: string,
    description: string;
    icon: string;
}

export interface List {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number
    };
    weather: Weather[];
    clouds: {
        all: number
    };
    wind: {
        speed: number;
        deg: number;
        gust: number
    };
    visibility?: number;
    pop: number;
    rain?: {
        '3h': number;
    };
    sys: {
        pod: string
    };
    dt_txt: string
}

export interface Response {
    cod: string;
    message: number;
    cnt: number;
    city: City;
    list: List[];
}

export interface Location {
    latitude: number;
    longitude: number;
}

export type FavoType = {
    _id: string,
    userId: string,
    name: string,
    latitude: number,
    longitude: number
}
