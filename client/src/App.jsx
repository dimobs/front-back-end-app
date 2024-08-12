import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import TableRow from './components/TableRow/TableRow';
import TableDetails from './components/TableRow/TableDetails'
import Login from './components/Login/Login';
import NotFound from './components/NotFound404/NotFound';

const App = () => {

    return (
        <>

        <Header />
        <Routes>
        <Route path='/' element={<TableRow />} />
        <Route path='/item/:itemId' element={<TableDetails/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/not-found' element={<NotFound />} />
        <Route path='/*' element={<NotFound />} />
        </Routes>
        </>
    )
};

export default App;
