import { useEffect, useState } from "react";

export function useFetch(url, initialData) {
    const [data, setData] = useState(initialData);

    useEffect(() => {      
        (async () => {
            const response = await fetch(url);
            const result = await response.json();
            setData(result)
        });
    });

    return(
        data     
    );
}