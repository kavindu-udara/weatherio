import {
    FaSun,
    FaMoon,
    FaCloudSun,
    FaCloudMoon,
    FaCloud,
    FaCloudShowersHeavy,
    FaCloudRain,
    FaBolt,
    FaSnowflake,
    FaSmog,
    FaCloudSunRain
} from 'react-icons/fa';

const weatherIconMapping: Record<string, React.ComponentType> = {
    '01d': FaSun,             // clear sky (day)
    '01n': FaMoon,            // clear sky (night)
    '02d': FaCloudSun,        // few clouds (day)
    '02n': FaCloudMoon,       // few clouds (night)
    '03d': FaCloud,           // scattered clouds
    '03n': FaCloud,
    '04d': FaCloud,           // broken clouds
    '04n': FaCloud,
    '09d': FaCloudShowersHeavy, // shower rain
    '09n': FaCloudShowersHeavy,
    '10d': FaCloudRain,       // rain
    '10n': FaCloudSunRain, // edited
    '11d': FaBolt,            // thunderstorm
    '11n': FaBolt,
    '13d': FaSnowflake,       // snow
    '13n': FaSnowflake,
    '50d': FaSmog,            // mist
    '50n': FaSmog,
};

export default weatherIconMapping;
