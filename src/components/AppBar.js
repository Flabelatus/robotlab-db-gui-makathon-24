import { useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from '.././images/logo.png'

export const AppBar = () => {

    useEffect(() => {
    }, []);

    return (
        <>
            <div className="App-header row justify-content-center " >
                <header className='d-flex justify-content-center align-items-center pb-1 mb-1 mt-4'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p ><img src={Logo} style={{ width: 220 }}></img></p>
                        <p><Link to="/modify" className='mt-2 btn btn-outline-secondary- ms-5 fonts' style={{ color: 'white', fontSize: 20 }}>Modify Data</Link></p>
                        <p><a className='mt-2 btn ms-5 btn-submit-light-small-outline- fonts' href="https://robotlab-residualwood.onrender.com/api-docs" rel="noopener noreferrer" target="_blank" style={{ color: 'white', fontSize: 20 }}>API Docs</a></p>
                        <p><a className='mt-2 btn ms-5 btn-submit-light-small-outline- fonts' href="https://uva-hva.gitlab.host/robotlab/wood/cw4.0" rel="noopener noreferrer" target="_blank" style={{ color: 'white', fontSize: 20 }}>Database Repository</a></p>
                        <Link to="/login"><p className='btn btn-submit-light-small ms-5 mt-2 fonts' style={{ fontSize: 20 }}>Login</p></Link>

                    </div>
                </header>
            </div>
        </>
    );
}