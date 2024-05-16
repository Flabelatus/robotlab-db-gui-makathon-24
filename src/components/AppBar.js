import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from '.././images/logo.png';
import { AppContext } from "../App";
import Cookie from 'js-cookie';

export const AppBar = () => {
    const { setLogged, jwtToken } = useContext(AppContext);
    const navigate = useNavigate();

    // const jwtToken = sessionStorage.getItem('jwtToken');
    console.log(jwtToken);
    const handleLogout = () => {

        const requestOptions = {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + jwtToken,
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": Cookie.get("csrf_access_token")
            },

            credentials: 'include'
        };

        fetch(`${process.env.REACT_APP_BACKEND}/logout`, requestOptions)
            .then((response) => response.json())
            .then(() => {
                sessionStorage.removeItem("jwtToken");
                setLogged(false);
                
                navigate('/login');
            })
            .catch(error => {
                console.error(error.message);
            })
          
    };
    return (
        <header className='text-white ' style={{ backgroundColor: '#50f', }}>
            <div className="container-fluid">
                <div className="row justify-content-between align-items-center p-3">
                    {/* <div className="col-6 col-md-2 mb-5">
                        <img src={Logo} alt="Logo" style={{ maxWidth: '100%' }} />
                    </div> */}
                    <div className="col-10 col-md-10 text-end">
                        <Link to="/about" className='btn fonts me-2' style={{ color: 'white', fontSize: 12 }}>
                            About
                        </Link>
                        <Link to="/contact" className='btn fonts me-2' style={{ color: 'white', fontSize: 12 }}>
                            Contact
                        </Link>
                        
                        {!jwtToken ? (
                            <Link to="/login" className='btn btn-submit-light-small mt-2 fonts' style={{ fontSize: 12 }}>
                                Login
                            </Link>
                        ) : (
                            <Link to="/" className='btn btn-submit-light-small mt-2 fonts' style={{ fontSize: 12 }} onClick={handleLogout}>
                                Logout
                            </Link>
                        )}

                    </div>
                </div>
            </div>
        </header>
    );
}