import { createContext, useState, useContext } from "react";

// Create
const ErrorContext = createContext({
  error: null,
  setError: (message, duration) => {},
  clearError: () => {},
});

export const ErrorProvider = ({ children }) => {
  const [error, setErrorState] = useState(null);

  const setError = (message, type = 'error', duration = 6000 ) => {
    setErrorState({message, type});
    if (duration) {
      setTimeout(() => {
        setErrorState(null);
      }, duration);
    }
  };

  const clearError = () => {
    setErrorState(null);
  };

  return (
    <ErrorContext.Provider value={{ error, setError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => useContext(ErrorContext);
