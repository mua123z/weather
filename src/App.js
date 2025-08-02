import Home from "./page/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeatherCard from "./component/WeatherCard/WeatherCard.jsx"
import SeaHis from "./component/SearchHistory/Search-History.jsx";
import WeatherList from "./component/City/City.jsx";
import WeatherCardPage from "./component/WeatherCard/WeatherCardPage.jsx";
import Weather7day from "./component/weather7day/weather7day.jsx";
import DubaoNgay from "./component/WeatherDay/dubaongay.jsx";


function App() {
  return (

    // <Home/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}>
          <Route index element={
            <>
              <SeaHis />
              <WeatherCard showWeatherDay={false}/> 
              <WeatherList/>
            </>
            } 
          />
          <Route path="/weatherCard" element={<WeatherCardPage/>}></Route>
          
          <Route path="/dubaongay/:city/:date" element={<DubaoNgay />} />

        </Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
