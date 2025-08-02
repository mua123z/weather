
import style from "./WeatherCard.module.css";


//truyền weather và eror từ weatherCaard qua
function ItemCity({ weather, error, tempMax, tempMin}) {
    

    if (error) return <div>{error}</div>;
    if (!weather) return <div>Đang tải thời tiết...</div>;

    return (
        <div className={`${style.itemCity}`}>
            <div className="h-50">
                <h3 className="fs-1 h-100">{weather.name}</h3>
            </div>
            <div className="d-flex h-50 align-items-center">
                <div className={`${style.itemCityNhietdo}`}>{Math.round(weather.main.temp)}°</div>
                <div className={`${style.itemCityNhietdoNgay} d-flex flex-column justify-content-end h-100`}>
                    <div>C: {Math.round(tempMax)}° T: {Math.round(tempMin)}°</div>
                    <div>
                        <p>
                            {weather.weather[0].description.charAt(0).toUpperCase() +
                            weather.weather[0].description.slice(1)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemCity;
