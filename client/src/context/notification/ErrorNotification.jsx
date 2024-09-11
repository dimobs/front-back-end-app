// import React from 'react';
import { useError } from "./ErrorContext";
import './NotificationCSS.css';


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

export default function ErrorNotification() {
  const {error, setError, clearError} = useError();
  
  const notificationClass = error ? `notification ${error.type || error}` : 'notification';


document.onkeydown = function (e) {
  if (e.keyCode == 27) {
    handleClose();
  }
};
const handleClose = () => setError(null);
if(!error || !error.message) return null;

  return (
    <div className={notificationClass}>
      <p>{error.message}</p>
      <button onClick={clearError} className="close-btn">
        x
      </button>
    </div>
  );
}
