import { useState, useEffect } from 'react';
import TableRowItem from './TableRowItem';
// import style from 'TableRow.module.css'

export default function TableRow() {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    const values = {name, description, amount}
    // Initial Render / Component Mount
    useEffect(() => {
        console.log('inital rendering');       
        fetch('http://localhost:3030/api/items')
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    //Update Rows
    useEffect(() => {
        console.log('values updateing');
        fetch('http://localhost:3030/api/items')        
        .then(response => response.json())
        .then(data => setItems(data))
        .catch(error => console.error('Error fetching data:', error));
    }, [values.name, values.description, values.amount]);

    const addItem = () => {
        fetch('http://localhost:3030/api/items', {
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
            <h1>Item List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                   {items.map((i) => (
                    <TableRowItem 
                    key={i.id}
                    date={i.date}
                    name={i.name}
                    description={i.description}
                    value={i.amount}
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
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                />
                <button onClick={addItem}>Add Item</button>
            </div>
        </div>
    );
};