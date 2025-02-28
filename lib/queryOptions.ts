import { queryOptions } from "@tanstack/react-query";
import { getWeatherDetails } from "./apiClient";

export function getWeatherDetailsQueryOption() {
    return queryOptions({
        queryKey: ["weather"],
        queryFn: () => getWeatherDetails(),
        enabled: true,
    });
}
