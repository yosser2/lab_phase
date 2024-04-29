import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Route,RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';


//private Routes
import PrivateRoute from './components/PrivateRoute.jsx';



//Auth
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';


//Profile
import Profile from './pages/User/Profile.jsx';

import AdminRoute from "./pages/Admin/AdminRoute.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>

    <Route path='login' element={<Login/>}/>
    <Route path='register' element={<Register/>}/>

      <Route path='' element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>}/>
      </Route>

    {/*/admin Routes*/}
    <Route path='/admin' element={<AdminRoute/>}>
        <Route path='userlist' element={<UserList/>}/>
    </Route>




    </Route>
  );
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <RouterProvider router={router}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </RouterProvider>
  </Provider>
);



