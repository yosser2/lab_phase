import React from "react";
import { Outlet } from "react-router-dom"
import Navigation from './pages/Auth/Navigation'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>  
      <Navigation />
      <index className="py-3" >
        <Outlet />
      </index>
      <ToastContainer />
    </>
  );
}

export default App;
