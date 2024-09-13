import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthContextProvider } from './context/auth/AuthContext';
import Header from './components/Header/Header';
import TableRow from './components/TableRow/TableRow';
import TableDetails from './components/TableRow/TableDetails'
import Login from './components/login/Login';
import Register from './components/login/Register';
import NotFound from './components/NotFound404/NotFound';
import Spinner from './context/spinner/Spinner';
import ConfirmModal from './util/confirmModal/ConfirmModal';
import Logout from './components/logout/logout';
import EditTable from './components/tableRow/EditTable';
import PrivateGuard from './components/common/PrivateGuard';
import { LoadingProvider } from './context/spinner/SpinnerContext';
import LoadingSpinner from './context/spinner/Spinner';
import { ErrorProvider } from './context/notification/ErrorContext';
import ErrorNotification from './context/notification/ErrorNotification';
import { ConfirmProvider } from './context/notification/confirmModal/ConfirmContext';

const App = () => {

    return (
        <>
        <AuthContextProvider>
        <Header />
            <LoadingProvider>  
            <LoadingSpinner />
            <ErrorProvider>
            <ErrorNotification />     
           <ConfirmProvider>
        <Routes>
        <Route path='/' element={<TableRow />} />
        <Route element={<PrivateGuard />}>
        <Route path='/item/:itemId' element={<TableDetails/>} />
        <Route path='/edit/:itemId' element={<EditTable/>} />
        <Route path='/logout' element={<Logout />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/not-found' element={<NotFound />} />
        <Route path='/*' element={<NotFound />} />
        <Route path='/spinner' element={<Spinner />} />
        <Route path='/confirm' element={<ConfirmModal />} />
        </Routes>   
        </ConfirmProvider>           
        </ErrorProvider>    
        </LoadingProvider>
        </AuthContextProvider>
        </>
    )
};

export default App;
