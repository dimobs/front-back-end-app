import { useState, useEffect, useRef } from 'react';
import TableRowItem from './TableRowItem';
// import style from 'TableRow.module.css';
import './tableRow.css';


export default function TableRow() {
    // const [items, setItems] = useState([]);
    
    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
    })
    const baseUrl = ('http://localhost:3030/api/items')

    const [formValue, setFormValue] = useState([]);

    // Initial Render / Component Mount
    useEffect(() => { 
        try {
        fetch(baseUrl)
            .then(response => response.json())
            .then(data => setFormValue(data))
        }catch (err){
           console.error('Error fetching data:', err);
        }
    }, []);

    // const totalAmount = formValue.reduce((total, item) => total + Number(item.amount), 0);
    
    const formSubmitHandler = (e) => {
        e.preventDefault();
      

        try {
            const data = {
                name: formValue.name,
                description: formValue.description,
                amount: formValue.amount
            }

            console.log(data);
            
            fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, description, amount}),
            })
                .then(response => response.json())
                .then(data => setFormValue([data, ...formValue]))
        }catch(err){
             console.error('Error adding item:', err);
        }
    }

const changeHandler = (e) => {
    setFormValue(oldValue => ({
        ...oldValue,
        [e.target.name]: e.target.type === 'checkbox'
        ? e.target.checked
        : e.target.value
    }));
};

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
                    name='name'
                    id="name"
                    value={formValue.name}
                    onChange={changeHandler}
                />
                <input
                    className='input__table'
                    type="text"
                    name='description'
                    placeholder="Description"
                    id='description'
                    value={formValue.description}
                    onChange={changeHandler}
                />
                <input
                    className='input__table'
                    type="number"
                    id='amount'
                    name='amount'
                    placeholder="Amount"
                    value={formValue.amount}
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
                   {formValue.map((i, idx) => (
                    <TableRowItem 
                    key={i.id}
                    itemId = {i.id}
                    date={i.date}
                    name={i.name}
                    description={i.description}
                    value={i.amount}
                    index = {idx + 1}
                    />
                   ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3">Total</td>
                        {/* <td>{totalAmount}лв.</td>                         */}
                    </tr>
                </tfoot>
            </table>
          
        </div>
        </div>
    );
}