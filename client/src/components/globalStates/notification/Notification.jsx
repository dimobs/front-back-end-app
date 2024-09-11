import React from 'react';
import './NotificationCSS.css';

const Notification = ({ message, visible, onClose }) => {
    if (!visible) return null;

    return (
        <div className="notification">
           <p>{message}</p> 
            <button onClick={onClose} className="close-btn">x</button>
        </div>
    );
};

export default Notification;
