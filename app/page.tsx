import FiveDayForecastCard from "@/components/cards/fiveDayForecastCard";
import NowCard from "@/components/cards/nowCard";
import TodayAtCard from "@/components/cards/todayAtCard";
import TodaysHighlightsCard from "@/components/cards/todaysHighlightsCard";

export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-5 p-5">
      <div className="flex flex-col gap-5">
        <NowCard/>
        <FiveDayForecastCard/>
      </div>
      <div className="col-span-3 flex flex-col gap-3">
        <TodaysHighlightsCard/>
        <TodayAtCard/>
      </div>
    </div>
  );
}
