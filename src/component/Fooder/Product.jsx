import style from "./Fooder.module.css"

function Product(){
    return(
        <div className={`${style.product}`}>
            <h3>SẢN PHẨM</h3>
            <div className="d-flex flex-column">
                <a href="">Ma Tóe</a>
                <a href="">Form Login</a>
                <a href="">Casio Calculator</a>
            </div>
        </div>
    )
}

export default Product;