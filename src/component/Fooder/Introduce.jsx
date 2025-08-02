import style from "./Fooder.module.css"


function Introduce(){
    return(
        <div className={`${style.introduce}`}>
            <h3>GIỚI THIỆU</h3>
            <p>Chào mừng bạn đến với WEATHER nơi dự báo thời tiết
             chuẩn từng giờ từng ngày trên khắp đất nước Việt Nam.
              Bằng tất cả uy tín chúng tôi cam kết sản phẩm Vip nhất sever châu Á</p>
        </div>
    )
}

export default Introduce;