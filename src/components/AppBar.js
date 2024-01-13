import { useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from '.././images/logo.png'

export const AppBar = () => {

    return (
        <header className='text-white' style={{ backgroundColor: 'blue', }}>
            <div className="container-fluid">
                <div className="row justify-content-between align-items-center p-3">
                    <div className="col-6 col-md-2 mb-5">
                        <img src={Logo} alt="Logo" style={{ maxWidth: '100%' }} />
                    </div>
                    <div className="col-10 col-md-10 text-end">
                        <Link to="/modify" className='btn fonts me-2' style={{ color: 'white', fontSize: 20 }}>
                            Modify Data
                        </Link>
                        <a className='btn fonts me-2' href="https://robotlab-residualwood.onrender.com/api-docs" rel="noopener noreferrer" target="_blank" style={{ color: 'white', fontSize: 20 }}>
                            API Docs
                        </a>
                        <a className='btn fonts me-2' href="https://uva-hva.gitlab.host/robotlab/wood/cw4.0" rel="noopener noreferrer" target="_blank" style={{ color: 'white', fontSize: 20 }}>
                            Database Repository
                        </a>
                        <Link to="/login" className='btn btn-submit-light-small mt-2 fonts' style={{ fontSize: 20 }}>
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}