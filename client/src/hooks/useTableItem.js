import { useEffect, useState } from "react";
import itemsAPI from "../api/item-api";
import { useParams } from "react-router-dom";
import { useLoading } from "../context/spinner/SpinnerContext";
import { useError } from "../context/notification/ErrorContext";



// export function useAllTableData() {
//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [notification, setNotification] = useState({ message: "", visible: false })
//     const onClose = () => {
//         setNotification({ message: '', visible: false });
//     }
//     useEffect(() => {
//         (async () => {
//             setLoading(true);
//             try {
//                 const result = await itemsAPI.getAll();
//                 setItems(result);
//             } catch (err) {
//                 setNotification({ message: `Cannot reach the server.\nError: ${err}`, visible: true });
//                 setTimeout(() => {
//                     setNotification({ message: '', visible: false });
//                 }, 6000)
//             } finally {
//                 setLoading(false)
//             }
//         })();

//     }, []);

//     return [items, loading, notification, onClose];
// }

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
                const result = await itemsAPI.getOne(id);
                console.log(result, 'useTableItem.js');

                setItem(result);
            } catch (err) {
                setNotification({ message: `Error: ${err}`, visible: true });
                setTimeout(() => {
                    setNotification({ message: '', visible: false });
                }, 6000)
            } finally {
                // setLoading(false)
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
    const createItem = (values) => {

        const result = itemsAPI.create(values)

        return result;
    }

    return createItem
}

export function useGetOne() {
    const [item, setState] = useState(async () => {
    });
    const updateState = async (id) => {
        const result = await itemsAPI.getOne(id);
        setState(result[0]);
    }

    return [item, updateState];
}

export function useGetAllTableItems() {
    const {setError } = useError();
    const { setLoading } = useLoading();
    const [all, setAll] = useState([]);
    const [notification, setNotification] = useState({ message: "", visible: false })
    const onClose = () => {
        setNotification({ message: '', visible: false });
    }
    useEffect(() => {
   
        (async () => {
            setLoading(true);
            try {
                const result = await itemsAPI.getAll();
                setAll(result);
                // setError('All items are updated successfully!', 'success')
            } catch (err) {
                setError(err.message, 'error')
                // setNotification({ message: `Cannot reach the server.\nError: ${err}`, visible: true });
                // setTimeout(() => {
                //     setNotification({ message: '', visible: false });
                // }, 6000)
            } finally {
                setLoading(false)
            }
        })();

    }, []);

    return [all, setAll, notification, setNotification, onClose];
}

export function useDelete() {
    const [delItem, setDelItem] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleDeleteClick = async (id) => {
        setItemToDelete(id);
        setIsModalOpen(true);
    }

    const confirmDelete = async (id) => {
        try {
            const result = await itemsAPI.remove(id);
            console.log(result);

        } catch (err) {
            console.log(err.message);

        }
    }

    const cancelDelete = () => {
        setIsModalOpen(false);
        setItemToDelete(null);
    };

    return [delItem, setDelItem, isModalOpen, setIsModalOpen, itemToDelete, setItemToDelete, cancelDelete, handleDeleteClick]
}


export function useGetOneForEdit(itemId) {
    const [item, setItem] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await itemsAPI.getOne(itemId);
            // console.log(result);
            
            setItem(result[0])
        })()
    }, [itemId])
    // console.log(game);
    
    return [item, setItem]
}

// export function useGetOneCallback() {
//     const [item, setItem] = useState([]);

//     const handleCallBack = async (id) => {
//       const result = await itemsAPI.getOne(id);
//       setItem[result[0]]; 
//     }
    
//     return [item, handleCallBack, setItem];
// }

