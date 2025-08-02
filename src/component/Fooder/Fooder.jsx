// chân trang
import Address from "./address";
import style from "./Fooder.module.css"
import Introduce from "./Introduce";
import Lienhe from "./Lienhe";
import Product from "./Product";


function Fooder(){
    return(
        <div className={`${style.fooder}`}>
            <div className={`${style.ctfooder}  d-flex`}>
                <Introduce/>
                <Product/>
                <Lienhe/>
                <Address/>
            </div>
            <hr />
            <div>
                <p className="text-center">© 2025</p>
            </div>
        </div>
    )
}

export default Fooder;