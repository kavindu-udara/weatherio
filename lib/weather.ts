export const getCloudStatus = (no: number) => {
    return no > 0 ? "Clear Sky ☁️" : no > 25 ? "Mostly Clear 🌤️" : no > 50 ? "Party Cloudy" : no > 75 ? "Mostly Cloudy" : "Overcast"
}
