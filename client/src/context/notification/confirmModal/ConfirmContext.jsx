import { createContext, useState, useContext } from "react";
import styles from './ConfirmContext.module.css'

const ConfirmContext = createContext();

// ConfirmProvider Component
export const ConfirmProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [resolveCallback, setResolveCallback] = useState(null);
  const [createUser, setCreatedUser] = useState('createdUser', {})

  // Show confirmation modal
  const showConfirmModal = (msg) => {
    return new Promise((resolve) => {
      setMessage(msg);
      setIsVisible(true);
      setResolveCallback(() => resolve); // Save the resolve function
    });
  };

  // Handle user action in modal
  const handleConfirm = (choice) => {
    setIsVisible(false);
    if (resolveCallback) {
      resolveCallback(choice); // Resolve the Promise with the user's choice (true/false)
    }
  };

  return (
    <ConfirmContext.Provider value={{ confirm: showConfirmModal }}>
      {children}
      {isVisible && (
        <div className={styles["modal-overlay"]}>
          <div className={styles["modal-container"]}>
            <div className={styles['modal-title']}>Delete</div>
            <p className={styles['modal-message']}>{message}</p>
            <div className={styles['modal-buttons']}>
            <button  className={styles['modal-confirm-btn']}   onClick={() => handleConfirm(true)}>Yes</button>
            <button  className={styles['modal-cancel-btn']}  onClick={() => handleConfirm(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
};

// Hook to use Confirm Context
export const useConfirm = () => useContext(ConfirmContext);
