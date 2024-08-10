import { useState, useEffect } from 'react';
import TableRowItem from './TableRowItem';
// import style from 'TableRow.module.css'
import './tableRow.css'


export default function TableRow() {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    const baseUrl = ('http://localhost:3030/api/items')

    // Initial Render / Component Mount
    useEffect(() => {
        console.log('inital rendering');       
        try {
        fetch(baseUrl)
            .then(response => response.json())
            .then(data => setItems(data))
        }catch (err){
            (error => console.error('Error fetching data:', error));
        }
    }, []);

    //Update Rows
    // useEffect(() => {
    //     console.log('values updateing');
    //     fetch('http://localhost:3030/api/items')        
    //     .then(response => response.json())
    //     .then(data => setItems(data))
    //     .catch(error => console.error('Error fetching data:', error));
    // }, [values.name, values.description, values.amount]);

    const addItem = () => {
        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description, amount }),
        })
            .then(response => response.json())
            .then(data => setItems([data, ...items]))
            .catch(error => console.error('Error adding item:', error));
    };
console.log(items);

    const totalAmount = items.reduce((total, item) => total + Number(item.amount), 0);
    
    return (
        <div>
             <div className='table__body'>
            <h1>Item List</h1>
            <div>
                <input
                    className='input'
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    className='input__table'
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <input
                    className='input'
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                />
                <button className='btn-submit form__submit' onClick={addItem}>Add Item</button>
            </div>
           
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
                    id = {i.id}
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
                        <td>{totalAmount}лв.</td>                        
                    </tr>
                </tfoot>
            </table>
          
        </div>
        </div>
    );
};