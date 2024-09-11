// import React from 'react';
// import './NotificationCSS.css';

import { useError } from "./ErrorContext";

// const Notification = ({ message, visible, onClose }) => {
//     if (!visible) return null;

//     return (
//         <div className="notification">
//            <p>{message}</p> 
//             <button onClick={onClose} className="close-btn">x</button>
//         </div>
//     );
// };

// export default Notification;

export default function ErrorModal() {
    const {error, setError} = useError();

    const handleClose = () => setError(null);

    return (
        error && (
        <div className="notification">
        <p>{error}</p> 
        <button onClick={handleClose} className="close-btn">x</button>
</div>
        )
    )
}