import React, { useState, useEffect } from 'react';

const App = () => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        console.log('react get all...');
        
        fetch('http://localhost:3030/api/items')
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

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

    return (
        <div>
            <h1>Item List</h1>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.name}: {item.description} - ${item.amount}</li>
                ))}
            </ul>
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

export default App;
