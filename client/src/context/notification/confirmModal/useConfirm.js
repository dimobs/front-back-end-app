import { useState, useContext } from "react";
import ConfirmContext from "./ConfirmContext"; 

export const useConfirm = () => {
  const { showConfirmModal } = useContext(ConfirmContext);
  return (message) => {
    return new Promise((resolve) => {
      showConfirmModal(message, (userConfirmed) => {
        resolve(userConfirmed); 
      });
    });
  };
};
