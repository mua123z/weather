import style from "./WeatherCard.module.css"

function ChiTiet({weather, tempMax, tempMin}){

    if (!weather) return null;

    return(
        <div className={`${style.chiTiet}`}>
            <div className={`${style.h2chitiet}`}>
                <h2>Chi tiết thời tiết</h2>
            </div>

            <div className={`${style.listItem}`}>
                <div>
                    {/* viết hoa chữ cái đầu cho tình trạng thời tiết */}
                    <p>
                        {weather.weather[0].description.charAt(0).toUpperCase() +
                        weather.weather[0].description.slice(1)}
                        
                        {/* hiển thị hình ảnh theo trạng thái */}
                        {weather && (
                            <img
                                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                alt="weather icon"
                            />
                        )}
                    </p>
                </div>
                <div className={`${style.itemChitiet} d-flex justify-content-between`}>
                    <p>Nhiệt độ cao nhất</p>
                    <div>
                        <span>{tempMax} °C</span>
                    </div>
                </div>
                <div className={`${style.itemChitiet} d-flex justify-content-between`}>
                    <p>Nhiệt độ thấp nhất</p>
                    <div>
                        <span>{tempMin} °C</span>
                    </div>
                </div>
                <div className={`${style.itemChitiet} d-flex justify-content-between`}>
                    <p>Độ ẩm</p>
                    <div>
                        <span>{weather.main.humidity} %</span>
                    </div>
                </div>
                <div className={`${style.itemChitiet} d-flex justify-content-between`}>
                    <p>Lượng mây</p>
                    <div>
                        <span>{weather.clouds.all} %</span>
                    </div>
                </div>
                <div className={`${style.itemChitiet} d-flex justify-content-between`}>
                    <p>Gió</p>
                    <div>
                        <span>{weather.wind.speed} m/s</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChiTiet;