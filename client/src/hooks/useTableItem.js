import { useEffect, useState } from "react";
import itemsAPI from "../api/item-api";

export function useAllTableData() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({message: "", visible: false})
    const onClose = () => {
        setNotification({ message: '', visible: false });
    }
    useEffect(() => {
        (async () => {
            setLoading(true);          
            try {
                const result = await itemsAPI.getAll();           
                setItems(result);
            }catch(err) {
                setNotification({message:`Cannot reach the server.\nError: ${err}`, visible: true});               
                setTimeout(() => {
                    setNotification({ message: '', visible: false });
                }, 6000)
            }finally {
                setLoading(false)
            }
        })();

    }, []);

    return [items, loading, notification, onClose];
}



export function useGetOneTableData(id) {
    const [itemAs, setItem] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({message: "", visible: false})
    const onClose = () => {
        setNotification({ message: '', visible: false });
    }
    useEffect(() => {
        (async () => {
            setLoading(true);          
            try {
                const result = await itemsAPI.getOne(id);
                console.log(result, 'useTableItem.js');

                setItem(result);
            }catch(err) {
                setNotification({message:`Error: ${err}`, visible: true});               
                setTimeout(() => {
                    setNotification({ message: '', visible: false });
                }, 6000)
            }finally {
                setLoading(false)
            }
        })()
    }, [id]);

const item = {name: "Az", description: "Demo", amount: "10"

}
    return [item, setItem, onClose];
}

