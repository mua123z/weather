import style from "./Fooder.module.css"


function Lienhe(){
    return(
        <div className={`${style.lienhe} `}>
            <h3>LIÊN HỆ</h3>
            <div>
                <p>
                    <i className='bx bx-envelope bx-tada' ></i>
                    muavip2023@gmail.com
                </p>
                <p>
                    <i className='bx bx-phone-call bx-tada' ></i>
                    0335784110
                </p>
                <div>
                    <a href=""><i className='bx bxl-facebook' ></i></a>
                </div>
            </div>
        </div>
    )
}

export default Lienhe