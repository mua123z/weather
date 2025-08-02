import { useState, useEffect } from "react";
import { fetchForecastByCity, fetchWeatherByCity } from "../../Api/Api";
import style from "./WeatherDay.module.css";

function WeatherHour({ selectedCity }) {
    const [forecastList, setForecastList] = useState([]);
    const [currentWeather, setCurrentWeather] = useState(null);

    useEffect(() => {
        const getWeatherData = async () => {
            try {
                const [forecastData, currentData] = await Promise.all([
                    fetchForecastByCity(selectedCity),
                    fetchWeatherByCity(selectedCity),
                ]);

                const now = new Date();
                const startOfToday = new Date();
                startOfToday.setHours(0, 0, 0, 0);
                const startOfTomorrow = new Date(startOfToday);
                startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

                // Lọc các khung giờ hôm nay
                const todayForecast = forecastData.list.filter((item) => {
                    const time = new Date(item.dt_txt);
                    return time >= startOfToday && time < startOfTomorrow;
                });

                // future: từ bây giờ → 00:00 đêm
                const future = todayForecast.filter(item => new Date(item.dt_txt) >= now);

                // past: từ 00:00 sáng → trước bây giờ
                const past = todayForecast.filter(item => new Date(item.dt_txt) < now);

                setForecastList([...future, ...past]); // nối lại theo thứ tự yêu cầu
                setCurrentWeather(currentData);
            } catch (err) {
                console.error("Lỗi dự báo thời tiết", err);
            }
        };

        if (selectedCity) getWeatherData();
    }, [selectedCity]);

    // Dự báo mô tả: chỉ các giờ SAU thời điểm hiện tại
    const GenerateForecastDescription = (list) => {
        if (!list || list.length === 0) return "";

        const now = new Date();
        const weatherMap = {};

        list.forEach((item) => {
            const time = new Date(item.dt_txt);
            const hour = time.getHours();

            // ❗❗ Chỉ lấy các mốc giờ nằm SAU thời điểm hiện tại
            if (time <= now) return;

            const desc = item.weather[0].description.toLowerCase();

            let keyword = "";
            if (desc.includes("mưa")) keyword = "mưa";
            else if (desc.includes("mây")) keyword = "mây";
            else if (desc.includes("nắng")) keyword = "nắng";
            else if (desc.includes("gió")) keyword = "gió";
            else keyword = "khác";

            if (!weatherMap[keyword]) weatherMap[keyword] = [];
            weatherMap[keyword].push(hour);
        });

        const parts = [];

        for (let [key, hours] of Object.entries(weatherMap)) {
            const hourText = hours.map(h => `${h.toString().padStart(2, '0')}:00`).join(", ");
            if (key === "mưa") parts.push(`trời có mưa lúc ${hourText}`);
            else if (key === "mây") parts.push(`có mây rải rác lúc ${hourText}`);
            else if (key === "nắng") parts.push(`nắng nhẹ lúc ${hourText}`);
            else if (key === "gió") parts.push(`gió mạnh lúc ${hourText}`);
            else parts.push(`thời tiết thay đổi lúc ${hourText}`);
        }

        return parts.join(", ") + ".";
    };
    const forecastDescription = GenerateForecastDescription(forecastList);

    return (
        <div className={`${style.WeatherDay}`}>
            <div>
                <p>{forecastDescription.charAt(0).toUpperCase() + forecastDescription.slice(1)}</p>
            </div>
            <hr />
            <div className={`${style.hour} d-flex gap-3`}>
                {/* Hiển thị "Bây giờ" */}
                {currentWeather && (
                    <div className={`${style.hourItem} d-flex flex-column align-items-center`}>
                        <p className="">Bây giờ</p>
                        <img
                            src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
                            alt="icon"
                            width="50"
                        />
                        <p>{Math.round(currentWeather.main.temp)}°</p>
                    </div>
                )}

                {/* Các khung giờ hôm nay */}
                {forecastList.map((item, index) => {
                    const date = new Date(item.dt_txt);
                    const hourLabel = `${date.getHours().toString().padStart(2, "0")}:00`;
                    return (
                        <div key={index} className={`${style.hourItem} d-flex flex-column align-items-center`}>
                            <p>{hourLabel}</p>
                            <img
                                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                alt="icon"
                                width="50"
                            />
                            <p>{Math.round(item.main.temp)}°</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default WeatherHour;
