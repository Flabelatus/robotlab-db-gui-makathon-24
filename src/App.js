import './App.css';
import './index.css';
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Alert from './components/Alert'
import { AppBar } from './components/AppBar';
import React, { useCallback, useEffect, useState } from 'react';
import Footer from './components/Footer';
import { Card, CardBody, Col, Row } from 'reactstrap';
import Logo from './images/logo.png'

import Cookies from 'js-cookie';

export const AppContext = React.createContext();

function App() {

  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");
  const [logged, setLogged] = useState(false);
  const [devMode, setDevMode] = useState(false);
  const navigate = useNavigate();

  const jwtToken = sessionStorage.getItem("jwtToken");

  useEffect(() => {
    if (!jwtToken) {
      navigate('/login');
      return;
    };
  }, [jwtToken, logged, devMode]);

  const handleSwitchMode = () => {
    if (devMode) {
      setDevMode(false);
    } else {
      setDevMode(true);
    }
  }

  return (
    <>
      <AppContext.Provider value={{ jwtToken, logged, setLogged }}>
        <div style={{ backgroundColor: '#5500ff', width: 'fit-content', padding: 10 }}>
          <div>

            <Row className='justify-content-center' >
              <Col sm={12} md={3}>
                <div className="mt-4 mb-5">
                  <Link to='/'><img src={Logo} alt="Logo" style={{ maxWidth: '50%' }} /></Link>
                </div>
                <Card style={{ height: 'fit-content', border: '0px solid #ccc', backgroundColor: '#fff', boxShadow: '1px 1px 15px #22a', borderRadius: 8 }} className='bg-transparent-'>
                  <CardBody>
                    <Link to='/' className='btn btn- fonts text-start mb-5 side-options' style={{ fontSize: 14, fontWeight: 700, width: 200 }}>Home</Link>

                    {jwtToken && <Link to='/intake' className='btn btn- fonts text-start mb-2 side-options' style={{ fontSize: 14, fontWeight: 600, width: 200 }}>Manual Intake dashboard</Link>}
                    {/* {jwtToken && <Link to='/intake-digital' className='btn btn- fonts text-start mb-2 side-options' style={{ fontSize: 14, fontWeight: 600, width: 200 }}>Digital Intake dashboard</Link>} */}
                    {jwtToken && <Link to='/materials' className='btn btn- fonts text-start mb-2 side-options' style={{ fontSize: 14, fontWeight: 600, width: 200 }}>Material passports</Link>}

                    <Link to='/data-viewer' className='btn btn- fonts text-start mb-2 side-options' style={{ fontSize: 14, fontWeight: 600, width: 200 }}>Wood database</Link><hr style={{ color: '#555' }} />

                    <a href='https://robotlab-residualwood.onrender.com/api-docs' rel="noopener noreferrer" target="_blank" className='btn btn- fonts text-start mb-2 side-options' style={{ fontSize: 14, fontWeight: 600, width: 200 }}>API</a><br />
                    <a href="https://uva-hva.gitlab.host/robotlab/wood/cw4.0" rel="noopener noreferrer" target="_blank" className='btn btn- fonts text-start mb-2 side-options' style={{ fontSize: 14, fontWeight: 600, width: 200 }}>Project repository</a><hr style={{ color: '#555' }} />

                    {!devMode ? <button className="btn btn- fonts text-start mb-4 side-options" style={{ fontSize: 14, fontWeight: 600, width: 200 }} onClick={handleSwitchMode}>Switch to dev mode</button> :
                      <button className="btn btn- fonts text-start mb-4 side-options" style={{ fontSize: 14, fontWeight: 600, width: 200 }} onClick={handleSwitchMode}>Switch to production mode</button>}
                  </CardBody>
                </Card>
              </Col>
              <Col sm={12} md={9}>
                <AppBar></AppBar>
                <div className='justify-content-center' >
                  {alertMessage && (
                    <Alert
                      message={alertMessage}
                      className={alertClassName}
                    />
                  )}

                  {/* {!devMode ? <button className="btn btn-submit-light-small fonts px-4 mb-4  ms-4" style={{ width: "fit-content", height: 'fit-content' }} onClick={handleSwitchMode}>switch to dev mode</button> :
                    <button className="btn btn-submit-light-small fonts px-4 mb-4 ms-4" style={{ width: "fit-content", height: 'fit-content' }} onClick={handleSwitchMode}>switch to production mode</button>} */}

                  <div className="row justify-content-center">
                    <div className="row justify-content-center" style={{ backgroundColor: '#eeddff', width: 'fit-content', height: 'fit-content', borderRadius: 16 }}>
                      {devMode && <h3 className="px-5 mt-4 badge text-center py-1 fonts text-center" style={{ width: 'fit-content', height: 'fit-content', color: '#2222FF', borderRadius: 8, alignItems: 'center', backgroundColor: '#fff' }}>dev mode</h3>}
                      {devMode && <p className="text-center mt-4 fonts" style={{ color: "#2222FF" }}>In dev mode, the requests are sent to the satged database url for development<br /> found here: https://robotlab-residualwood-dev.onrender.com</p>}
                    </div>
                  </div>
                  <div className='row justify-content-center' style={{minHeight: 600}}>
                    <Outlet context={{ setAlertMessage, setAlertClassName, setLogged, devMode, setDevMode, jwtToken }}></Outlet>
                  </div>
                  <Footer />
                </div>
              </Col>
            </Row>

          </div>
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
