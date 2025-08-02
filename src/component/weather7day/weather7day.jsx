import { useEffect, useState } from "react";
import { fetchForecastByCity } from "../../Api/Api";
import style from "./bayngay.module.css"
import { Link, Outlet } from "react-router-dom";

function Weather7day({ selectedCity }) {
    const [dailyForecasts, setDailyForecasts] = useState([]);

    useEffect(() => {
        if (!selectedCity) return;

        const getForecast = async () => {
            try {
                const data = await fetchForecastByCity(selectedCity);

                // Nhóm dữ liệu theo ngày
                const dailyMap = {};

                data.list.forEach(item => {
                    const date = item.dt_txt.split(" ")[0];
                    if (!dailyMap[date]) {
                        dailyMap[date] = [];
                    }
                    dailyMap[date].push(item);
                });

                // Chọn 1 bản ghi tiêu biểu mỗi ngày (gần 12h trưa nhất)
                const selectedDailyForecasts = Object.values(dailyMap).map(items => {
                    return items.reduce((closest, current) => {
                        const targetHour = 12;
                        const currentHour = parseInt(current.dt_txt.split(" ")[1].split(":")[0]);
                        const closestHour = parseInt(closest.dt_txt.split(" ")[1].split(":")[0]);
                        return Math.abs(currentHour - targetHour) < Math.abs(closestHour - targetHour)
                            ? current : closest;
                    });
                });

                // Chỉ lấy 7 ngày đầu tiên
                setDailyForecasts(selectedDailyForecasts.slice(0, 7)); // vì api đnag free nên chỉ lấy đưuọc 5 ngày

            } catch (err) {
                console.error("Lỗi khi lấy dự báo:", err);
            }
        };

        getForecast();
    }, [selectedCity]);

    return (
        <div className={`${style.bayngay}`}>
            <h3>Dự báo 5 ngày tới</h3>
            <hr />
            <div className="">
                {dailyForecasts.map((item, index) => (
                    <Link 
                        key={index}
                        to={`/dubaongay/${selectedCity}/${item.dt_txt.split(" ")[0]}`}
                        className={`${style.item} d-flex `}
                    >
                        <p className="w-25"><strong>{new Date(item.dt_txt).toLocaleDateString("vi-VN", { weekday: "short", day: "2-digit", month: "2-digit" })}</strong></p>
                        <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="icon" />
                        <p>{Math.round(item.main.temp)}°C</p>
                        <p className={`${style.mota}`}>{item.weather[0].description}</p>
                    </Link>
                ))}
            </div>

            <Outlet/>
        </div>
    );
}

export default Weather7day;
