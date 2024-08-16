import { useEffect, useRef } from "react";


export default function useFocus() {
    const focusRef = useRef();

    useEffect(() => {
        if (focusRef.current) {
            focusRef.current.focus();
        }
    }, [focusRef])

    return focusRef;
}
