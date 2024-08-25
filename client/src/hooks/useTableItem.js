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
    const [items, setItems] = useState([]);

    const createItem = async (values) => {
        const result =  await itemsAPI.create(values);
        console.log(result);
        // setItems(oldState => [result, ...oldState])
        // setState(result)
        // console.log(values, "values");
    }

    return createItem
}

export async function useGetOne (id) {
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ message: "", visible: false })
    const onClose = () => {
        setNotification({ message: '', visible: false });
    }
    const result = await itemsAPI.getOne(id);
    setItem(result);
    console.log(item);
    

    return [item, setItem, onClose];
}