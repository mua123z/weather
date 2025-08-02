import { Outlet } from "react-router-dom";
import Fooder from "../component/Fooder/Fooder";
import Head from "../component/Head/Head";
import WeatherCard from "../component/WeatherCard/WeatherCard";


function Home(){


    return(
        <div className="">
            <Head/>
            <Outlet /> {/*outlet để hiện các component con*/}
            
            <Fooder/>
        </div>
    )
}
export default Home