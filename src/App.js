import './App.css';
import './index.css';
import { Outlet } from 'react-router-dom'
import Alert from './components/Alert'
import { AppBar } from './components/AppBar';
import React, { useCallback, useEffect, useState } from 'react';
import Footer from './components/Footer';
import Cookies from 'js-cookie';

export const AppContext = React.createContext();

function App() {

  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");
  const [logged, setLogged] = useState(false);

  const jwtToken = sessionStorage.getItem("jwtToken");

  useEffect(() => {

  }, [jwtToken, logged]);

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
              <Outlet context={{ setAlertMessage, setAlertClassName, setLogged }}></Outlet>
              <Footer />
            </div>
          </div>
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
