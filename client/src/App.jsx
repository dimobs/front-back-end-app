import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import TableRow from './components/TableRow/TableRow';
import TableDetails from './components/TableRow/TableDetails'
import Login from './components/login/Login';
import Register from './components/login/Register';
import NotFound from './components/NotFound404/NotFound';
import Spinner from './components/spinner/Spinner';
import ConfirmModal from './util/confirmModal/ConfirmModal';

const App = () => {

    return (
        <>

        <Header />
        <Routes>
        <Route path='/' element={<TableRow />} />
        <Route path='/item/:itemId' element={<TableDetails/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/not-found' element={<NotFound />} />
        <Route path='/*' element={<NotFound />} />
        <Route path='/spinner' element={<Spinner />} />
        <Route path='/confirm' element={<ConfirmModal />} />
        </Routes>
        </>
    )
};

export default App;
