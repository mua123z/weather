import style from "./Fooder.module.css"


function Address(){
    return(
        <div className={`${style.address}`}>
            <h3>ĐỊA CHỈ</h3>
            <p>
                <i className={`bx bx-current-location`} ></i>
                Phường 14 Tân Bình TP.HCM
            </p>
            <iframe 
                title="Google Maps Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.1423202274873!2d106.65469268463688!3d10.799892978365778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175292976c117ad%3A0x5b3f38b21051f84!2zSOG7jWMgVmnhu4duIEjDoG5nIEtow7RuZyBWaeG7h3QgTmFtIENTMg!5e1!3m2!1svi!2s!4v1745143857057!5m2!1svi!2s"
                width="250" 
                height="250" 
                style={{ border: "0" }}
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
    )
}

export default Address;