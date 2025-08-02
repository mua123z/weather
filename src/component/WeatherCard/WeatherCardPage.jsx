// component trung gian: lấy city từ URL
import { useSearchParams } from "react-router-dom";
import WeatherCard from "./WeatherCard";

function WeatherCardPage() {
    const [searchParams] = useSearchParams();
    const city = searchParams.get("city");

    return <WeatherCard selectedCity={city} />;
}

export default WeatherCardPage;
