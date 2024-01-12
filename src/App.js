import './App.css';
import { Outlet } from 'react-router-dom'
import Alert from './components/Alert'
import { AppBar } from './components/AppBar';
import React, { useCallback, useEffect, useState } from 'react';
import Footer from './components/Footer';

export const AppContext = React.createContext();

function App() {

  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");

  return (
    <>
      <AppContext.Provider value={{}}>
        <div>
          <div>
            <AppBar></AppBar>
            <div className='justify-content-center'>
              {alertMessage && (
                <Alert
                  message={alertMessage}
                  className={alertClassName}
                />
              )}
              <Outlet context={{ setAlertMessage, setAlertClassName }}></Outlet>
              <Footer />
            </div>
          </div>
        </div>
      </AppContext.Provider>
    </>
  );

}

export default App;
