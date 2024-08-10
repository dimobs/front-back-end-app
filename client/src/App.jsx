import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import TableRow from './components/TableRow/TableRow';
import Header from './components/Header/Header';
import Login from './components/Login/Login';


const App = () => {

    return (
        <>

        <Header />
        <Routes>
        <Route path='/' element={<TableRow />} />
        <Route path='/login' element={<Login />} />

        </Routes>
        </>
    )
};

export default App;
