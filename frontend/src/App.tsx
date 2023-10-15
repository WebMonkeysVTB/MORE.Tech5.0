import React from 'react';

import './App.css';
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import MapPage from "./pages/MapPage/MapPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import SignUpAtm from "./pages/SignUpAtm/SignUpAtm";
import SignUpDepartment from "./pages/SignUpDepartment/SignUpDepartment";
import QrPage from "./pages/QrPage/QrPage";


function App() {

    return (
        <div className="App">
            <Nav/>
            <main>
                <Routes>
                    <Route path={'/'} element={<MainPage/>}/>
                    <Route path={'/auth'} element={<AuthPage/>}/>
                    <Route path={'/map'} element={<MapPage/>}/>
                    <Route path={'/qr'} element={<QrPage/>}/>
                    <Route path={'/sign_up_atm/:id'} element={<SignUpAtm/>}/>
                    <Route path={'/sign_up_department/:id'} element={<SignUpDepartment/>}/>
                    <Route path={'*'} element={<NotFoundPage/>}/>
                </Routes>
            </main>
            <Footer/>
        </div>
    );
}

export default App;
