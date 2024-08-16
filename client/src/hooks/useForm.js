import { useState } from "react";

export function useForm(initialValues, submitCallback) {
    const [values, setValues]  = useState(initialValues);


const changeHandler = (e) => {  
    setValues(state => ({
        [e.target.name]: e.target.type === 'checkbox'
        ? e.target.checked
        : e.target.value,        
        ...state,
        }))
    };   

    const submitHandler = (e) => {
        e.preventDefault();

        submitCallback(values);
    }
    return {
        values,
        changeHandler,
        submitHandler,
    };
}



