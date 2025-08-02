import {Link, Outlet} from 'react-router-dom';
import style from "../SearchHistory/SeaHis.module.css";
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchWeatherByCity } from "../../Api/Api";


function ItemHistory(){

    //khaoi tạo biến chứa danh sách dữ liệu thời tiết
    const [weatherList, setWeatherList] = useState([])

    //render khi componert được hiển thị
    useEffect(() => {
        const fetchHistoryWeather = async () => {
            const saved = localStorage.getItem("weather_history");
            const cities = saved ? JSON.parse(saved) : [];

            // Gọi API cho từng thành phố
            const results = await Promise.all(
                cities.map(async (city) => {
                    try {
                        const data = await fetchWeatherByCity(city);
                        return data.cod === 200 ? data : null;
                    } catch (err) {
                        return null;
                    }
                })
            );

            // Lọc bỏ null (thành phố lỗi)
            const filtered = results.filter((item) => item !== null);
            setWeatherList(filtered);
        };

        fetchHistoryWeather();
    }, []);


    return(
    <>
        {
            weatherList.map((weather, index) => (
                <Link
                    key={index}
                    to={`/weatherCard?city=${weather.name}`}
                    className={`${style.Itemhistory} text-decoration-none text-dark`}
                >
                    <div>
                        <h3 className="m-0">{weather.name}</h3>
                        <span>{weather.sys.country}</span>
                    </div>

                    <div className={style.ItemhistoryImg}>
                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
                    </div>

                    <p className="m-0">Thực tế: {Math.round(weather.main.temp)}°</p>
                </Link>
            ))  
        }
        
        <Outlet/>
    </>
    )
}
export default ItemHistory;