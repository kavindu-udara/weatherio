import { List } from "@/types";

export function filterListsByDate(weatherList: List[], targetDate: string) {
    return weatherList.filter(item => {
        const itemDate = item.dt_txt.split(" ")[0];
        return itemDate === targetDate;
    });
}

export function filterByUniqueDate(weatherList: List[]) {
    const seenDates = new Set<string>();
    return weatherList.filter((entry) => {
        const dateOnly = entry.dt_txt.split(" ")[0]; // Extract the date part
        if (!seenDates.has(dateOnly)) {
            seenDates.add(dateOnly);
            return true;
        }
        return false;
    });
}

export const chooseListByTime = (lists: List[]) => {
    // Get the current time as a Date object
    const now = new Date();

    // If the current time is before the first forecast, return the first one
    const firstDate = new Date(lists[0].dt_txt);
    if (now < firstDate) return lists[0];

    // Loop through each forecast period (except the last one)
    for (let i = 0; i < lists.length - 1; i++) {
        const start = new Date(lists[i].dt_txt);
        const end = new Date(lists[i + 1].dt_txt);
        if (now >= start && now < end) {
            return lists[i];
        }
    }

    // If current time is later than all forecast start times, return the last forecast
    return lists[lists.length - 1];
};
