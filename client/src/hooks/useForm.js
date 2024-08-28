import { useEffect, useState } from "react";

export function useForm(initialValues, submitCallback) {
    const [values, setValues]  = useState(initialValues);

    // useEffect(() => {
    //     setValues(initialValues)
    // }, [initialValues]);

    const changeHandler = (e) => {
        setValues((state) => ({
        //       // ...oldValue,
        //       // [e.target.name]: e.target.type === 'checkbox'
        //       // ? e.target.checked
        //       // : e.target.value
        ...state,
        [e.target.name]: e.target.value
            }));
          };
          
    const onSubmit = (e) => {
        e.preventDefault();
        submitCallback(values);
        setValues(initialValues);
    }
    return {
        values,
        changeHandler,
        onSubmit,
        setValues
    };
}



