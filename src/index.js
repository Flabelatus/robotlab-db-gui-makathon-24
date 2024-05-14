import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import IntakeHome from './components/IntakeHome';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { DBPage } from './components/DBViewer';
import DigitalIntake from './components/DigitalIntake';
import { Materials } from './components/Materials';


const router = createBrowserRouter([
  {
    "path": "/",
    "element": <App />,
    "errorElement": <ErrorPage></ErrorPage>,
    "children": [
      { index: true, element: <Home /> },
      // { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/intake", element: <IntakeHome /> },
      { path: "/data-viewer", element: <DBPage /> },
      { path: "/intake-digital", element: <DigitalIntake /> },
      { path: "/materials", element: <Materials /> }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
