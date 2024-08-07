import { useState, useEffect } from 'react';
import style from 'TableRow.module.css'

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
            .then(data => setItems([...items, data]))
            .catch(error => console.error('Error adding item:', error));
    };

    const totalAmount = items.reduce((total, item) => total + item.amount, 0);
    
    return (
        <div>
            <h1>Item List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>${item.amount}</td>
                            <td>{new Date(item.date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2">Total</td>
                        <td>${totalAmount}</td>
                        <td></td>
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