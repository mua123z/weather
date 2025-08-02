import React, { useState, useEffect } from "react";
import style from "./City.module.css"
import { Link, Outlet } from "react-router-dom";


// Component hiển thị 1 thành phố
function City({ city, temp, description }) {
  return (
    <div  className={`${style.cityItem}`}>
      <Link
        to={`/weatherCard?city=${city}`}
        className={`${style.cityItemLink}`}
      >
        <h3>{city}</h3>
        <div className="d-flex w-50">
          <span>{temp}°C</span>
          <p>{description}</p>
        </div>
      </Link>
      <Outlet></Outlet>
    </div>
  );
}

// Component hiển thị danh sách thời tiết của 10 thành phố ngẫu nhiên
function WeatherList() {
  const apiKey = "33a7fe3b77ce084b10ead44b90116d89";

  const allCities = [
    "Ha noi",
    "Ho Chi Minh",
    "Da Nang",
    "Viet Tri",
    "Can Tho",
    "Nha Trang",
    "Vung Tau",
    "Hue",
    "Quy Nhon",
    "Da Lat"
  ];
  

  const [weatherData, setWeatherData] = useState([]);

  const getRandomCities = (arr, num) => {
    return arr.sort(() => 0.5 - Math.random()).slice(0, num);
  };

  useEffect(() => {
    const fetchWeather = async () => {
      const randomCities = getRandomCities(allCities, 10);
      const promises = randomCities.map(async (city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=vi`;
        const res = await fetch(url);
        const data = await res.json();
        return {
          city: city,
          temp: data.main ? data.main.temp : "N/A",
          description: data.weather ? data.weather[0].description : "Không có dữ liệu"
        };
      });

      const results = await Promise.all(promises);
      setWeatherData(results);
    };

    fetchWeather();
  }, []);

  return (
    <div className={`${style.weatherList}`}>
      
      
      {weatherData.map((item, index) => (
        <City
          key={index}
          city={item.city}
          temp={item.temp}
          description={item.description}
        />
      ))}
      
    </div>
  );
}

export default WeatherList;
