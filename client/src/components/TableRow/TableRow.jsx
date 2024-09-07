import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useFocus from "../../hooks/useFocus";
import { useCreate, useGetAllTableItems} from "../../hooks/useTableItem";
import Spinner from "../spinner/Spinner";
import TableDetails from "./TableDetails";
import TableRowItem from "./TableRowItem";
import "./tableRow.css";
import Notification from "../Notification/Notification";
import { useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";

const INITIAL_VALUE = { name: "", description: "", amount: "" };

export default function TableRow() {
  const { isAuthenticated } = useAuthContext();
  const cursorPointer = useFocus();
  // const { itemId } = useParams();
  const loading = false;
  const [showItem, setShowItem] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    visible: false,
  });
  // getOne
  const [item, setitem] = useState([]);
  // const [item, handleCallBack] = useGetOneCallback();
  // getall
  const [items, setItems ] = useGetAllTableItems();
   const totalAmount = (items.length == 0) 
  ? ""
  : `${(items.reduce((total, x) => total + Number(x.amount), 0)).toFixed(2)}лв.`;
  // createGETTER
  const createItem = useCreate();

  // createSetter
  const createHandler = async(values) => {
    if (!values.name || !values.description || !values.amount){
      return
    }
    try{
    const newItemCreated = await createItem(values);
    setItems((oldState) => [newItemCreated, ...oldState]);
    }catch (err){
      console.log(err.message);      
    }
  };
  const { values, changeHandler, onsubmitHandler } = useForm(
    INITIAL_VALUE,
    createHandler
  );

  // setOnClose
  const onClose = () => {
    setNotification({ message: "", visible: false });
  };

// getOne
const detailsHandler = async (i) => {
  setShowItem(true);
  setitem(i)
}

  // onClose
  const itemModalCloseHandler = () => {
    setShowItem(false);
  };
  return (
    <div>
      <div className="table__body">
        <h1>Table</h1>
        <Notification
          message={notification.message}
          visible={notification.visible}
          onClose={onClose}
        />

        {/* <ConfirmModal
                isOpen={isModalOpen}
                message={`Are you sure you want to delete ${itemToDelete?.name}?`}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            /> */}
        {isAuthenticated && (
          <form onSubmit={onsubmitHandler}>
            <div>
              <input
                className="input__table"
                ref={cursorPointer}
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
                spellCheck="true"
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
              <button             
              className="btn-submit form__submit">
                Add Entry
                </button>
            </div>
          </form>
        )}
        <table className="table__container">
          <thead>
            <tr>
              <th className="header__items">User</th>
              <th className="header__items">Date</th>
              <th className="header__items">Name</th>
              <th className="header__items">Description</th>
              <th className="header__items">Amount</th>
              <th className="header__items controls">Controls</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6}>
                  <Spinner />
                </td>
              </tr>
            ) : (
              items.map((i, idx) => (
                <TableRowItem
                  key={i.id}
                  username = {i.username.email.split('@')[0]}
                  itemId={i.id}
                  date={i.date}
                  name={i.name}
                  description={i.description}
                  value={i.amount}
                  modify={i.updatedAt}
                  index={idx + 1}
                itemDetailsClickHandler={() => {detailsHandler(i)}}
                
                  // itemDelHandler={handleDeleteClick}
                />
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4">Total</td>
              <td>{totalAmount}</td>
            </tr>
          </tfoot>
        </table>
        {showItem && (
          <TableDetails        
            detailsItem={item}
            onClose={itemModalCloseHandler}
            // itemDelHandler={handleDeleteClick}

            //            // onSave={itemSaveHandler}
          />
        )}
      </div>
    </div>
  );
}
