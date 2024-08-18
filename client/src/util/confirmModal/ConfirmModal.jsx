import React from 'react';
import './ConfirmModal.css';


const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Confirmation</h2>
                <p>{message}</p>
                <div className="modal-actions">
                    <button className="confirm-btn" onClick={onConfirm}>Confirm</button>
                    <button className="cancel-btn" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
