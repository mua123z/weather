import Search from "./Search"
import History from "./History"
import style from "./SeaHis.module.css";
import { useState } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import bg from "../../assets/bghome.jpg"

function SeaHis(){
    const bghome = {
        backgroundImage:`url(${bg})`,
        height: '400px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }

    const [selectedCity, setSelectedCity] = useState(null);

    const handleCitySearch = (cityName) => {
        setSelectedCity(cityName);
    };


    return (
        <div style={bghome} className={style.SeaHis}>
            <Search onSearch={handleCitySearch}/>
            <History />

            {selectedCity && (
                <WeatherCard selectedCity={selectedCity} />
            )}
        </div>
    )
}

export default SeaHis;