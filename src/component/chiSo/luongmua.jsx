import { useEffect, useState } from "react";
import { fetchWeatherByCity, API_KEY } from "../../Api/Api";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import style from "./chiso.module.css"

// Component phụ để cập nhật vị trí động
function ChangeMapCenter({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}


function LuongMua({ selectedCity }) {
  const [center, setCenter] = useState([10.762622, 106.660172]); // mặc định: Hồ Chí Minh

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        if (selectedCity) {
          const data = await fetchWeatherByCity(selectedCity);
          if (data.coord) {
            setCenter([data.coord.lat, data.coord.lon]);
          }
        }
      } catch (error) {
        console.error("Không thể lấy tọa độ thành phố:", error.message);
      }
    };

    fetchCoords();
  }, [selectedCity]);

  return (
    <div className={`${style.luongmua}`}>
      <p>Bản đồ lượng mưa</p>
      <div className={`${style.bando}`}>
        <MapContainer
          center={center}
          zoom={7.7}
          scrollWheelZoom={true}
          className={`${style.ndbando}`}
        >
          <ChangeMapCenter center={center} /> {/* Cập nhật vị trí động */}

          <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://carto.com/">Carto</a>'
          />

          <TileLayer
            url={`https://tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png?appid=${API_KEY}`}
            opacity={0.9}
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
            crossOrigin={true}
          />        


        </MapContainer>
      </div>
    </div>
  );
}

export default LuongMua;
