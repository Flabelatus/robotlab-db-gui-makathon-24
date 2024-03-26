import './App.css';
import './index.css';
import { Outlet } from 'react-router-dom'
import Alert from './components/Alert'
import { AppBar } from './components/AppBar';
import React, { useCallback, useEffect, useState } from 'react';
import Footer from './components/Footer';
// import Cookies from 'js-cookie';

export const AppContext = React.createContext();

function App() {

  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");
  const [logged, setLogged] = useState(false);
  const [devMode, setDevMode] = useState(false);

  const jwtToken = sessionStorage.getItem("jwtToken");

  useEffect(() => {

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
      <AppContext.Provider value={{ jwtToken, setLogged }}>
        <div style={{ backgroundColor: '#0000ff', width: 'fit-content', padding: 10 }}>
          <div>
            <AppBar></AppBar>
            <div className='justify-content-center' >
              {alertMessage && (
                <Alert
                  message={alertMessage}
                  className={alertClassName}
                />
              )}

              {!devMode ? <button className="btn btn-submit-light-small fonts px-4 mb-4  ms-4" style={{ width: "fit-content", height: 'fit-content' }} onClick={handleSwitchMode}>switch to dev mode</button> :
                <button className="btn btn-submit-light-small fonts px-4 mb-4 ms-4" style={{ width: "fit-content", height: 'fit-content' }} onClick={handleSwitchMode}>switch to production mode</button>}

              <div className="row justify-content-center">
                <div className="row justify-content-center" style={{ backgroundColor: '#eeddff', width: 'fit-content', height: 'fit-content', borderRadius: 16 }}>
                  {devMode && <h3 className="px-5 mt-4 badge text-center py-1 fonts text-center" style={{ width: 'fit-content', height: 'fit-content', color: '#2222FF', borderRadius: 8, alignItems: 'center', backgroundColor: '#fff' }}>dev mode</h3>}
                  {devMode && <p className="text-center mt-4 fonts" style={{ color: "#2222FF" }}>In dev mode, the requests are sent to the satged database url for development<br /> found here: https://robotlab-residualwood-dev.onrender.com</p>}
                </div>
              </div>

              <Outlet context={{ setAlertMessage, setAlertClassName, setLogged, devMode, setDevMode }}></Outlet>
              <Footer />
            </div>
          </div>
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
