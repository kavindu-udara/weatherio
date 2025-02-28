import weatherIconMapping from "@/lib/weatherIconMapping";
import React from "react";
import { FaQuestion } from "react-icons/fa";
interface WeatherIconProps {
  iconCode: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ iconCode }) => {
  // Get the matching icon component, or use FaQuestion if none is found
  const IconComponent = weatherIconMapping[iconCode] || FaQuestion;
  return <IconComponent />;
};

export default WeatherIcon;
