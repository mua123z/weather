// chi tiết thời tiết

import ItemCity from "./ItemCity"
import ChiTiet from "./ChitietCity";
import style from "./WeatherCard.module.css"
import { useState, useEffect } from "react";
import { fetchWeatherByCoords, fetchWeatherByCity, fetchForecastByCity  } from "../../Api/Api";
import Weather7day from "../weather7day/weather7day";
import LuongMua from "../chiSo/luongmua";
import ChiSoUv from "../chiSo/chiSoTiaUV";
import Gio from "../chiSo/gio";
import WeatherHour from "../WeatherDay/WeatherHour"

function WeatherCard( {showWeatherDay=true, selectedCity}){

    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    // nhieeth độ max min trong ngày
    const [tempMax, setTempMax] = useState(null);
    const [tempMin, setTempMin] = useState(null);

    useEffect(() => {
        const getWeather = async () => {
            try {
                let data;
                if (selectedCity) {
                    data = await fetchWeatherByCity(selectedCity);
                    console.log("weather data", data);

                    if (data.cod === 200) {
                        setWeather(data);

                        const forecast = await fetchForecastByCity(selectedCity);
                        const today = new Date().toISOString().split("T")[0];
                        const todayTemps = forecast.list.filter(item => item.dt_txt.startsWith(today));
                        const temps = todayTemps.map(item => item.main.temp);

                        if (temps.length > 0) {
                            setTempMax(Math.max(...temps));
                            setTempMin(Math.min(...temps));
                        }

                        // lưu lịch sử
                        // chuẩn hóa
                        const normalizeCityName = (name) => {
                            return name.normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")
                                .replace(/\s+/g, "")
                                .toLowerCase();
                        };

                        // lưu lịch sử không trùng
                        let history = localStorage.getItem("weather_history");
                        let cityList = history ? JSON.parse(history) : [];
                        const selectedNormalized = normalizeCityName(selectedCity);

                        cityList = cityList.filter((item) => normalizeCityName(item) !== selectedNormalized);
                        cityList.unshift(selectedCity.trim());
                        if (cityList.length > 4) cityList.pop();

                        localStorage.setItem("weather_history", JSON.stringify(cityList));

                    }
                } else {
                    navigator.geolocation.getCurrentPosition(
                        async (position) => {
                            data = await fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
                            setWeather(data);

                            const currentCity = data.name;
                            const forecast = await fetchForecastByCity(currentCity);
                            const today = new Date().toISOString().split("T")[0];
                            const todayTemps = forecast.list.filter(item => item.dt_txt.startsWith(today));
                            const temps = todayTemps.map(item => item.main.temp);

                            if (temps.length > 0) {
                                setTempMax(Math.max(...temps));
                                setTempMin(Math.min(...temps));
                            }
                        },
                        (err) => setError("Không thể lấy vị trí của bạn")
                    );
                }
            } catch (err) {
                setError("Lỗi khi lấy dữ liệu thời tiết.");
                console.error(err.message);
            }
        };

        getWeather();
    }, [selectedCity]); //  chỉ cần theo dõi selectedCity


    return (
        <div className={`${style.weatherCard} d-flex`}>
            <div className={`${style.weatherCard1} w-100 d-flex`}>
                <ItemCity cityName={selectedCity} weather={weather} error={error} tempMin={tempMin} tempMax={tempMax}/>
                <ChiTiet weather={weather} tempMin={tempMin} tempMax={tempMax}/>
            </div>

            
            {showWeatherDay && 
                <>
                    <WeatherHour selectedCity={selectedCity}/>   {/*hiển thị thông tin thời tiết trong ngày*/}
                    
                    <div className={`${style.luongmuabayngay}`}>
                        <div className={`${style.luongmua}`}> 
                            <LuongMua selectedCity={selectedCity} />
                        </div>
                        <div className={`${style.bayngay}`}> 
                            <Weather7day selectedCity={selectedCity} />
                        </div>
                    </div>
                </>
                
            }
        </div>
    )
}

export default WeatherCard;