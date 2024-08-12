import { useState, useEffect, useRef } from 'react';
import TableRowItem from './TableRowItem';
import './tableRow.css';
import TableDetails from './tableDetails';
import Notification from '../Notification/Notification';


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
    const totalAmount = items.reduce((total, item) => total + Number(item.amount), 0);
    const resetFrom = () => {onchange(INITIAL_STATE)};
    const inputRef = useRef();
    const [notification, setNotification] = useState({ message: '', visible: false });
    const baseUrl = ('http://localhost:3030/api/items')
   
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

const itemDetailsClickHandler = (id) => {
    ToggleItem(true)
    setId( );
}

const itemModalCloseHandler = () => {
    ToggleItem(false)
}

const itemDelClickHandler = async (id) => {
    const itemForDel = items.find((i) => i.id == id)
    if (!itemForDel){
        return
    }
  const hasConfirmed = confirm(`Are you shure do you want to delete ${itemForDel.name}?`);
  if(hasConfirmed){
    const response = await fetch(`baseUrl/${itemForDel.id}`)
    const data = await response.json()
    console.log(data);
    
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
                    itemDelClickHandler={itemDelClickHandler}
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