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
document.onkeydown = function (e) {
  if (e.keyCode == 27) {
    handleClose();
  }
};
const handleClose = () => setError(null);
if(!error) return null;

  return (
    <div className="notification">
      <p>{error}</p>
      <button onClick={clearError} className="close-btn">
        x
      </button>
    </div>
  );
}
