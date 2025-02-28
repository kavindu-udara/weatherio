import { queryOptions } from "@tanstack/react-query";
import { getCurrentLocationWeatherDetails, getWeatherDetails } from "./apiClient";
import { Location } from "@/types";

export function getWeatherDetailsQueryOption(enabled:boolean) {
    return queryOptions({
        queryKey: ["weather"],
        queryFn: () => getWeatherDetails(),
        enabled,
    });
}

export function getCurrentLocationWeatherDetailsQueryOption(location: Location, enabled:boolean)  {
    return queryOptions({
        queryKey: ["weather", `${location.latitude},${location.longitude}`],
        queryFn: () => getCurrentLocationWeatherDetails(location),
        enabled
    });
}
