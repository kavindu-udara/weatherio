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
