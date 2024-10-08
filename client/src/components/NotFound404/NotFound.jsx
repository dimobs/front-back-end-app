import React from 'react';
import './NotFoundCSS.css';

const Notification = ({ message, visible, onClose }) => {
    if (!visible) return null;

    return (
        <div className="notification">
            {message}
            <button onClick={onClose} className="close-btn">x</button>
        </div>
    );
};

export default Notification;
