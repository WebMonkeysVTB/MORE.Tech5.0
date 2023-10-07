import React, {useState, useEffect, useRef} from 'react';
import {Special, Department} from './types';
import addFakeWorkload from './utils/addFakeWorkload';
import './App.css';
import Map from './components/Map';
import {Button, Checkbox, Modal} from 'antd';
import {useMemo} from 'react';
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import MapPage from "./pages/MapPage/MapPage";
import AuthPage from "./pages/AuthPage/AuthPage";


function App() {

    return (
        <div className="App">
            <Nav/>
            <main>
                <Routes>
                    <Route path={'/'} element={<MainPage/>}/>
                    <Route path={'/auth'} element={<AuthPage/>}/>
                    <Route path={'/map'} element={<MapPage/>}/>
                </Routes>
            </main>
            <Footer/>
        </div>
    );
}

export default App;
