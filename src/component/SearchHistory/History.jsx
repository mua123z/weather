//đay là lịch sử
import style from "../SearchHistory/SeaHis.module.css"
import ItemHistory from "./ItemHistory";

function History({ onItemClick }){
    return(
        <>
            <h2 className={`${style.textLs}`}>Lịch sử gần đây</h2>
            <div className={`${style.history} d-flex`}>
                {/* <div onClick={onItemClick} className={`${style.historyItem} w-25 h-100 `}> */}
                    <ItemHistory/>
                {/* </div> */}

            </div>
        </>
    )
}
export default History;