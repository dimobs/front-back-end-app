import { useEffect, useState } from "react";
import itemsAPI from "../api/item-api";
import { useParams } from "react-router-dom";

export function useAllTableData() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ message: "", visible: false })
    const onClose = () => {
        setNotification({ message: '', visible: false });
    }
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const result = await itemsAPI.getAll();
                setItems(result);
            } catch (err) {
                setNotification({ message: `Cannot reach the server.\nError: ${err}`, visible: true });
                setTimeout(() => {
                    setNotification({ message: '', visible: false });
                }, 6000)
            } finally {
                setLoading(false)
            }
        })();

    }, []);

    return [items, loading, notification, onClose];
}

export function useGetOneTableData(id) {
    const [itemAs, setItem] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ message: "", visible: false })
    const onClose = () => {
        setNotification({ message: '', visible: false });
    }
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const result = await itemsAPI.get4One(id);
                console.log(result, 'useTableItem.js');

                setItem(result);
            } catch (err) {
                setNotification({ message: `Error: ${err}`, visible: true });
                setTimeout(() => {
                    setNotification({ message: '', visible: false });
                }, 6000)
            } finally {
                setLoading(false)
            }
        })()
    }, [id]);

    const item = {
        name: "Az", description: "Demo", amount: "10"

    }

    return [item, setItem, onClose];
}

export function useCreateTableItem() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ message: "", visible: false })
    const onClose = () => {
        setNotification({ message: '', visible: false });
    }
    // useEffect(() => {
    //     (async () => {
    //         setLoading(true);
    //         try {
    //             const result = await itemsAPI.create(values);
    //             setItems(result);
    //         } catch (err) {
    //             setNotification({ message: `Cannot reach the server.\nError: ${err}`, visible: true });
    //             setTimeout(() => {
    //                 setNotification({ message: '', visible: false });
    //             }, 6000)
    //         } finally {
    //             setLoading(false)
    //         }
    //     })();

    // }, []);

    // return [items, loading, notification, onClose];
}

export function useCreate() {
    // const setState = useValueState();
    const [newItems, setItems] = useState( async () => {

    });

    const createItem = async (values) => {
        console.log(values, 'use');
        
        const result =  await itemsAPI.create(values);
        console.log(result, 'use table');
        setItems(oldValues => ({values, ...oldValues}))
        // setItems(oldState => [result, ...oldState])
        // setState(result)
        // console.log(values, "values");
    }

    return [newItems, createItem]
}

export function useGetOne () {
    const [item, setState] = useState( async () => {
        // const result = await itemsAPI.getOne();
        // console.log(result, 'useTableItem getOne');
        
        // return result
    });


    const updateState = async (id) => {                
            const result = await itemsAPI.getOne(id);            
        setState(result[0]);
    }

    return [item, updateState];
}