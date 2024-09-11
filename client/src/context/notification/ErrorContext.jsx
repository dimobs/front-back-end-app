import { createContext, useContext, useState } from "react";

const ErrorContext = createContext({
    error: null, 
    setError: () => {},
})


export function ErrorProvider({children}) {
const [error, setError] = useState(null);


    return (
       <ErrorContext.Provider value={{error, setError}}>
        {children}
       </ErrorContext.Provider> 
    );
}

export const useError = () => useContext(ErrorContext );