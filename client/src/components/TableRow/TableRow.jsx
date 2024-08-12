import { useState, useEffect, useRef } from 'react';
import TableRowItem from './TableRowItem';
import './tableRow.css';
import TableDetails from './tableDetails';


export default function TableRow() {
    const INITIAL_STATE = {
        name: '',
        description: '',
        amount: ''
    }
    const [showItem, ToggleItem] = useState(false);
    const [values, onchange] = useState([INITIAL_STATE]);
    const [items, setItems] = useState([]);
    const [id, setId] =useState(null);
    const baseUrl = ('http://localhost:3030/api/items')
    const totalAmount = items.reduce((total, item) => total + Number(item.amount), 0);
    const resetFrom = () => {onchange(INITIAL_STATE)};
    const inputRef = useRef();
   
    useEffect(() => {
        if(inputRef.current){
            inputRef.current.focus();
        }
    },[inputRef]);  
    
    useEffect(() => { 
        try {
        fetch(baseUrl)
            .then(response => response.json())
            .then(data => setItems(data))
        }catch (err){
           console.error('Error fetching data:', err);
        }
    }, []);

    const formSubmitHandler = async(e) => {
        // prevent refresh
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
    }catch(err){
        console.error('Error adding item:', err);
    }
    resetFrom();
        // close modal
        // ToggleItem(false);
    }

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

const itemDetailsClickHandler = (userId) => {
    ToggleItem(true)
    setId(userId);
}

const itemModalCloseHandler = () => {
    ToggleItem(false)
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
      
                   {items.map((i, idx) => (
                    <TableRowItem 
                    key={i.id}
                    itemId = {i.id}
                    date={i.date}
                    name={i.name}
                    description={i.description}
                    value={i.amount}
                    index = {idx + 1}
                    itemDetailsClickHandler={itemDetailsClickHandler}
                    />
                   ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="4">Total</td>
                        <td>{totalAmount.toFixed(2)}лв.</td>                        
                    </tr>
                </tfoot>
            </table>
            {
                console.log(items)
                
            }
          {showItem && (
            <TableDetails
            detailsItem={items.find(item => item.id == id)}
            onClose={itemModalCloseHandler} 
            // onSave={itemSaveHandler}
            />
          )}
        </div>
        </div>
    );
}