import { createContext, useState, useContext } from "react";

// Create ErrorContext
const ErrorContext = createContext({
  error: null,
  setError: (message, duration) => {},
  clearError: () => {},
});

export const ErrorProvider = ({ children }) => {
    
  const [error, setErrorState] = useState(null);

  // Function to set the error with optional timeout
  const setError = (message, duration = 5000) => {  
    setErrorState(message);
    
    // Automatically clear the error after the specified duration
    if (duration) {
      setTimeout(() => {
        setErrorState(null);
      }, duration);
    }
  };

  // Manually clear the error
  const clearError = () => {
    setErrorState(null);
  };

  return (
    <ErrorContext.Provider value={{ error, setError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

// Custom hook to use ErrorContext
export const useError = () => useContext(ErrorContext);
