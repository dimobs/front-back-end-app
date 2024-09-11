import { createContext, useContext, useState } from "react";

const LoadingContext  = createContext({
    loading: false,
    setLoading: () => {}
});

export function LoadingProvider({children}) {
    const [loading, setLoading ] = useState(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading}}>
            {children}
        </LoadingContext.Provider>
    );
}

export const useLoading = () => useContext(LoadingContext )