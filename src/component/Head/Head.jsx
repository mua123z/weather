import logo from "../../assets/logo.png"

function Head(){
    return(
        <div className="bg-dark d-flex justify-content-between align-items-center p-3">
            <div className="d-flex align-items-center ">
                <a href="http://localhost:3000/" className="text-decoration-none pe-3">
                    <img src={logo} alt="logo"  width="70" height="70"/>
                </a>
                <a href="http://localhost:3000/" className="text-decoration-none ">
                    <h1>WEATHER</h1>
                </a>
            </div>

            <div>
                <i className='bx bx-menu text-white fs-1' ></i>
            </div>
        </div>
    )
}

export default Head;