import { useState, useEffect, useRef } from "react";
import TableRowItem from "./TableRowItem";
import "./tableRow.css";
import TableDetails from './tableDetails';
import Notification from "../Notification/Notification";
// import itemsAPI from '../../api/item-api';
import Spinner from "../spinner/Spinner";
import useFocus from "../../hooks/useFocus";
import { useAllTableData, useGetOneTableData } from "../../hooks/useTableItem";
import { useForm } from "../../hooks/useForm";
import itemsAPI from "../../api/item-api";
import { useParams } from "react-router-dom";

export default function TableRow() {
  const INITIAL_STATE = { name: "", description: "", amount: "" };
  // const [notification, setNotification] = useState({ message: '', visible: false });
  const {idItem} = useParams();
  const [showItem, ToggleItem] = useState(false);
  const inputFocus = useFocus();
  // const [pending, setPending] = useState(false);
  // const [values, onchange] = useState(INITIAL_STATE);
  // const [items, setItems] = useState([]);
  // const [item, setItem] = useState([]);
  // const totalAmount = (items.length == 0)
  // ? ""
  // :`${(items.reduce((total, item) => total + Number(item.amount), 0)).toFixed(2)}лв.`;
  // const resetFrom = () => {onchange(INITIAL_STATE)};

  
  // getAll
  const [items, loading, notification, onClose] = useAllTableData();
  // useEffect(() => {
    //     setPending(true);
  //     (async () => {
  //       try {
  //     const result = await itemsAPI.getAll()
  //     setItems(result);
  // }catch(err){
  //     setNotification({ message: `Cannot reach the server.\nServer said: ${err}`, visible: true });
  //     setTimeout(() => {
  //         setNotification({ message: '', visible: false });
  //         }, 9000);
  //     }
  // })()
  //   setPending(false)
  // }, []);
  //state update
  // const changeHandler = (e) => {
  //   onchange((state) => ({
  //     // ...oldValue,
  //     // [e.target.name]: e.target.type === 'checkbox'
  //     // ? e.target.checked
  //     // : e.target.value
  //     ...state,
  //     [e.target.name]: e.target.value,
  //   }));
  // };
  //Submit post
  // const formSubmitHandler = async(e) => {
  //         e.preventDefault();
  //         const dataItems = Object.fromEntries(new FormData(e.currentTarget));
  //         const result = await itemsAPI.create(dataItems);
  //         setItems(oldState => [result, ...oldState])
  //         setNotification({ message: `${result.name} added successfully!`, visible: true });
  //         setTimeout(() => {
  //         setNotification({ message: '', visible: false });
  //         }, 4000);
  //     resetFrom();
  //     }
  //getOne  
  const getOne = useGetOneTableData()
  const getOneHandler = async (id) => {
    try {
      // const result = await getOne(id);
      console.log(result);
      
    }catch(err) {
      console.log(err);
    }
  }
  function itemDetailsClickHandler (itemId) {
      ToggleItem(true);
      // getOneHandler(itemId)
      
    }
    // const [item] = useGetOneTableData(idItem);
    const {values, changeHandler, onSubmit} = useForm(INITIAL_STATE, itemDetailsClickHandler)

  // const itemDetailsClickHandler = (id) => {
  //     ToggleItem(true)
  // try {
  // (async () => {
  //     const result = await itemsAPI.getOne(id)
  //     setItem(result[0]);
  // })()

  // }catch(err){
  //     console.error(err)
  // }
  // };
  //delete
  // const itemDelHandler = async (itemId, name) => {
  // const confirmed = confirm(`Are you sure do you want to delete ${name}`)
  // if (!confirmed){
  //     return
  // }
  // try{
  //     const result = await itemsAPI.remove(itemId, name);
  //     const restValues = items.filter((i) => i.id !== itemId);
  //     setItems(restValues);
  //     setNotification({ message: `${result[0].name} deleted successfully!`, visible: true });
  //     setTimeout(() => {
  //         setNotification({ message: '', visible: false });
  //     }, 4000);

  // }catch(err){
  // console.error(err)
  // }
  // }
  //close modal
  const itemModalCloseHandler = () => {
      ToggleItem(false)
  }
  return (
    <div>
      <div className="table__body">
        <h1>Table</h1>
        <Notification
          message={notification.message}
          visible={notification.visible}
          onClose={onClose}
        />
        {/* <form onSubmit={formSubmitHandler}> */}
        <form>
          <div>
            <input
              className="input__table"
              ref={inputFocus}
              type="text"
              placeholder="Name"
              id="name"
              name="name"
              value={values.name}
              onChange={changeHandler}
            />
            <input
              className="input__table"
              type="text"
              placeholder="Description"
              id="description"
              name="description"
              value={values.description}
              onChange={changeHandler}
            />
            <input
              className="input__table"
              type="number"
              step="0.01"
              id="amount"
              placeholder="Amount"
              name="amount"
              value={values.amount}
              onChange={changeHandler}
            />
            <button className="btn-submit form__submit">Add Item</button>
          </div>
        </form>
        <table className="table__container">
          <thead>
            <tr>
              <td className="index">No.</td>
              <th className="header__items">Date</th>
              <th className="header__items">Name</th>
              <th className="header__items">Description</th>
              <th className="header__items">Amount</th>
              <th className="header__items controls">Controls</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
            <tr><td colSpan={6}><Spinner /></td></tr>
            ) : (
              items.map((i, idx) => (
                <TableRowItem
                  key={i.id}
                  itemId={i.id}
                  date={i.date}
                  name={i.name}
                  description={i.description}
                  value={i.amount}
                  index={idx + 1}
                  itemDetailsClickHandler={itemDetailsClickHandler}
                  // itemDelHandler={itemDelHandler}
                />
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4">Total</td>
              {/* <td>{totalAmount}</td>                         */}
            </tr>
          </tfoot>
        </table>
        {showItem && (
            <TableDetails
            detailsItem={item}            
            onClose={itemModalCloseHandler} 

//            // onSave={itemSaveHandler}
            />
          )}
      </div>
    </div>
  );
}
