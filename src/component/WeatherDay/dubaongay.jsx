import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchForecastByCity } from "../../Api/Api";
import { generateForecastDescription } from "../../Api/Api";
import style from "./WeatherDay.module.css"
import City from "../City/City"
import { useNavigate } from "react-router-dom";
import MatTroi from "./matTroiTrongNgay";


function DubaoNgay(){
    //lấy ngày và thành phố từ dự báo 7 ngày
    const { city, date } = useParams();
    const cityName = decodeURIComponent(city); // ← dùng tên này để fetch dữ liệu

    const [dayData, setDayData] = useState([]);
    const [dataNgay, setDaTaNgay] = useState(null)

    

    useEffect(() => {
        const getData = async () => {
        try {
            const res = await fetchForecastByCity(cityName);
            const filtered = res.list.filter(item => item.dt_txt.startsWith(date));
            console.log("Dữ liệu lọc:", filtered); // Thêm dòng này
            setDayData(filtered);

            const avgTemp = Math.round(
                filtered.reduce((sum, item) => sum + item.main.temp, 0) / filtered.length
            );
            const tempMax = Math.max(...filtered.map(item => item.main.temp_max));
            const tempMin = Math.min(...filtered.map(item => item.main.temp_min));
            const description = filtered[0]?.weather[0].description || "";
            const windSpeed = Math.round(
                filtered.reduce((sum, item) => sum + item.wind.speed, 0) / filtered.length
            );
            const windDeg = Math.round(
                filtered.reduce((sum, item) => sum + item.wind.deg, 0) / filtered.length
            );
            const cloudPercent = Math.round(
                filtered.reduce((sum, item) => sum + item.clouds.all, 0) / filtered.length
            );
            const rainProb = Math.round(
                filtered.reduce((sum, item) => sum + item.pop, 0) / filtered.length * 100
            );
            const hasThunder = filtered.some(item => item.weather[0].id >= 200 && item.weather[0].id < 300);
            const motaDubao = generateForecastDescription(filtered)
            const icon = filtered[0]?.weather[0].icon || "";
            setDaTaNgay({
                motaDubao,
                avgTemp,
                tempMax,
                tempMin,
                description,
                windSpeed,
                windDeg,
                cloudPercent,
                rainProb,
                hasThunder,
                icon
            });


        } catch (err) {
            console.error("Lỗi lấy dữ liệu:", err);
        }
        };

        getData();
    }, [city, date]);

    //hàm sử lý hướng gió
    function getWindDirection(deg) {
        const directions = [
            "Bắc", "Bắc Đông Bắc", "Đông Bắc", "Đông Đông Bắc",
            "Đông", "Đông Đông Nam", "Đông Nam", "Nam Đông Nam",
            "Nam", "Nam Tây Nam", "Tây Nam", "Tây Tây Nam",
            "Tây", "Tây Tây Bắc", "Tây Bắc", "Bắc Tây Bắc"
        ];
        const index = Math.round(deg / 22.5) % 16;
        return directions[index];
    }

    //hàm xử ly sthay đổi ngày
    const navigate = useNavigate();

    function handleChangeDate(offset) {
        const currentDate = new Date(date);
        currentDate.setDate(currentDate.getDate() + offset);

        const newDateStr = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD
        navigate(`/dubaongay/${encodeURIComponent(city)}/${newDateStr}`);
    }



    return(
        <>
            {dataNgay &&
                (
                    <div className={`${style.dubaongay} gap-3`}>
                        <div className={`${style.name} d-flex align-items-center`}>
                            <h3>{city}</h3>
                            <p>{dataNgay.avgTemp}°C</p>
                            <p className={`${style.mota}`}>{dataNgay.description}</p>
                        </div>

                        <div className={`${style.chitiet}`}>
                            <div className="d-flex w-100 justify-content-between">
                                <i className={`bx  bx-chevron-down bx-rotate-90 fs-3 ${date === new Date().toISOString().split("T")[0] ? style.hiddenIcon : ""}`} onClick={()=>handleChangeDate(-1)}></i> 
                                <h5>{date}</h5>
                                <i className={`bx  bx-chevron-down bx-rotate-270 fs-3 ${[5].includes(
                                    Math.floor((new Date(date) - new Date(new Date().toISOString().split("T")[0])) / (1000 * 60 * 60 * 24))
                                    )
                                    ? style.hiddenIcon
                                    : ""}`} onClick={()=>handleChangeDate(+1)}>
                                </i> 
                            </div>
                            <hr />
                            <div>
                                <div className={`  d-flex justify-content-between`}>
                                    <p className="m-0">Ngày</p>
                                    <p className="m-0">{date}</p>
                                </div>
                                <hr />
                                <div>
                                    <div className={`${style.cttop} d-flex align-items-center`}>
                                        <div className={`${style.topicon}`}>
                                            <img
                                                src={`https://openweathermap.org/img/wn/${dataNgay.icon}@2x.png`}
                                                alt={dataNgay.description}
                                            />
                                            <p className="fs-2">{dataNgay.avgTemp}°C</p>
                                        </div>
                                        <div>
                                            <p>Nhiệt độ thấp nhất: {dataNgay.tempMin}°C</p>
                                            <p>Nhiệt độ cao nhất: {dataNgay.tempMax}°C</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <p className={` fs-4`}>{dataNgay.motaDubao}</p>
                                    <hr />
                                </div>
                                <div className={`${style.ctbody} d-flex `}>
                                    <div className={`${style.ttct}`}>
                                        <div className={`${style.list} d-flex justify-content-between`}>
                                            <p>Gió</p>
                                            <span>{dataNgay.windDeg}m/s</span>
                                        </div>
                                        <hr />
                                        <div className={`${style.list} d-flex justify-content-between`}>
                                            <p>Hướng gió</p>
                                            <span>{getWindDirection(dataNgay.windDeg)}</span>
                                        </div>
                                        <hr />
                                        <div className={`${style.list} d-flex justify-content-between`}>
                                            <p>Lượng mây</p>
                                            <span>{dataNgay.cloudPercent} %</span>
                                        </div>
                                        
                                        <hr />
                                    </div>
                                    <div className={`${style.ttct}`}>
                                        <div className={`${style.list} d-flex justify-content-between`}>
                                            <p>Xác suất có mưa</p>
                                            <span>{dataNgay.rainProb}%</span>
                                        </div>   
                                        <hr />
                                        <div className={`${style.list} d-flex justify-content-between`}>
                                            <p>Xác suất có giông bão</p>
                                            <span>{dataNgay.hasThunder ? "Có khả năng" : "Không có"}</span>
                                        </div>
                                        <hr />
                                    </div>
                                </div>
                                <div>
                                    {/* <p>Ban đêm</p> */}
                                </div>
                            </div>
                        </div>

                        {/* gọi ý các thành phố khác */}
                        {/* <MatTroi city={city} date={date}/> */}

                        <City />
                    </div>
                )
            }
        </>
    )
}

export default DubaoNgay;