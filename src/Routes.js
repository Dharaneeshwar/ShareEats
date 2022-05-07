import React from 'react';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import Home from './Home';
import Donor from './donor/Donor';
import Receiver from './receiver/Receiver';
import Logs from './logs/Logs';

const MyRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/donors" element={<Donor/>}/>
                <Route path="/receivers" element={<Receiver/>}/>
                <Route path="/logs" element={<Logs/>}/>
            </Routes>
        </Router>
    )
}

export default MyRoutes;