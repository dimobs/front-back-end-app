import { useState, useEffect, useRef } from 'react';
import TableRowItem from './TableRowItem';
import './tableRow.css';
import TableDetails from './tableDetails';
import Notification from '../Notification/Notification';
import * as itemApi from '../../api/item-api';
import Spinner from '../spinner/Spinner';


export default function TableRow() {
    const INITIAL_STATE = {
        name: '',
        description: '',
        amount: ''
    }
    const [showItem, ToggleItem] = useState(false);
    const [pending, setPending] = useState(false);
    const [values, onchange] = useState([INITIAL_STATE]);
    const [items, setItems] = useState([]);
    const [item, setItem] = useState([]);
    const totalAmount = items.reduce((total, item) => total + Number(item.amount), 0);
    const resetFrom = () => {onchange(INITIAL_STATE)};
    const inputRef = useRef();
    const [notification, setNotification] = useState({ message: '', visible: false });
    const baseUrl = ('http://localhost:3030/api/items')
    //ref
    useEffect(() => {
        if(inputRef.current){
            inputRef.current.focus();
        }
    },[inputRef]);  
    
    // getAll
    useEffect(() => { 
        setPending(true);
      (async () => {
        const result = await itemApi.getAll();
        setItems(result);
        setPending(false)
      })()
    }, []);

const changeHandler = (e) => {
        onchange(state => ({
            // ...oldValue,
            // [e.target.name]: e.target.type === 'checkbox'
            // ? e.target.checked
            // : e.target.value
            ...state,
            [e.target.name]: e.target.value,  
        }));
    };
    
//post
const formSubmitHandler = async(e) => {
        e.preventDefault();
        const dataItems = Object.fromEntries(new FormData(e.currentTarget));
      try{
        const response = await fetch(`${baseUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataItems),
        });
        const createdItems = await response.json();
        setItems(oldItems => [createdItems, ...oldItems]);
        setNotification({ message: 'Added successfully!', visible: true });
        setTimeout(() => {
            setNotification({ message: 'Saved...', visible: false });
        }, 4000);

    }catch(err){      
        setNotification({ message: `Data not saved! You should check the server or input validation. ${err}`, visible: true });
        setTimeout(() => {
            setNotification({ message: '', visible: false });
        }, 4000);

        // console.error('Error adding item:', err);

    }
    resetFrom();
        // close modal
        // ToggleItem(false);
    }

const itemDetailsClickHandler = (userId) => {
    ToggleItem(true)
try {
(async () => {  
    const response = await fetch(`${baseUrl}/${userId}`)
    if (response.status == "No Content"){
        return
    }
    const result = await response.json();
    setItem(result[0]);

})()
}catch(err){
    console.error(err)
}
}

const itemModalCloseHandler = () => {
    ToggleItem(false)
}

const itemDelHandler = async (itemId, name) => {
const confirmed = confirm(`Are you sure do you want to delete ${name}`)
if (!confirmed){
    return
}

try{
    const response = await fetch(`${baseUrl}/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.status == 204){
        return {};
    }
    const result = await response.json();
    if (!response.ok){
        throw result
    }

    console.log(result[0]);
    
    // setItems(oldItems => [...oldItems]);
    setNotification({ message: `${result[0].name} deleted successfully!`, visible: true });
    setTimeout(() => {
        setNotification({ message: '', visible: false });
    }, 4000);

}catch(err){      
console.error(err)
}
}
    return (
        <div>
             <div className='table__body'>
            <h1>Item List</h1>
            <form onSubmit={formSubmitHandler}>
            <div>
                <input
                    className='input__table'
                    ref={inputRef}
                    type="text"
                    placeholder="Name"
                    id="name"
                    name='name'
                    value={values.name || ''}
                    onChange={changeHandler}
                />
                <input
                    className='input__table'
                    type="text"
                    placeholder="Description"
                    id='description'
                    name='description'
                    value={values.description || ''}
                    onChange={changeHandler}
                />
                <input
                    className='input__table'
                    type="number"
                    step="0.01"
                    id='amount'
                    placeholder="Amount"
                    name='amount'
                    value={values.amount || ''}
                    onChange={changeHandler}
                />
                <button className='btn-submit form__submit'>Add Item</button>
            </div>
            <Notification message={notification.message} visible={notification.visible} onClose={() => setNotification({ message: 'From return', visible: false })} />

            </form>
            <table className='table__container'>
                <thead>
                    <tr>
                        <td className='index'>No.</td>
                        <th className='header__items'>Date</th>
                        <th className='header__items'>Name</th>
                        <th className='header__items'>Description</th>
                        <th className='header__items'>Amount</th>
                        <th className='header__items controls'>Controls</th>
                    </tr>
                </thead>
                <tbody>
      
                   {
                    pending 
                    ? <Spinner /> 
                    :
                    items.map((i, idx) => (
                    <TableRowItem 
                    key={i.id}
                    itemId = {i.id}
                    date={i.date}
                    name={i.name}
                    description={i.description}
                    value={i.amount}
                    index = {idx + 1}
                    itemDetailsClickHandler={itemDetailsClickHandler}                    
                    itemDelHandler={itemDelHandler}
                    />
                   ))
                // : <tr>
                //     <td colSpan="6">No Items added</td>
                //     </tr>
                }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="4">Total</td>
                        <td>{totalAmount.toFixed(2)}лв.</td>                        
                    </tr>
                </tfoot>
            </table>
          {showItem && (
            <TableDetails
            detailsItem={item}            
            onClose={itemModalCloseHandler} 
            // onSave={itemSaveHandler}
            />
          )}
        </div>
        </div>
    );
}