import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useFocus from "../../hooks/useFocus";
import { useCreate, useGetAllTableItems, useGetOneCallback} from "../../hooks/useTableItem";
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
  const inputFocus = useFocus();
  const { itemId } = useParams();
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
  const [items, setGame] = useGetAllTableItems();

  // createGETTER
  const createItem = useCreate();

  // createSetter
  const createHandler = async(values) => {
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
const detailsHandler = async (id) => {
  setShowItem(true);
  setitem(id)
  
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
        )}
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
              <tr>
                <td colSpan={6}>
                  <Spinner />
                </td>
              </tr>
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
                  itemDetailsClickHandler={() => {
                    setShowItem(true)
                    setitem(i)
                  }}
                  // itemDelHandler={handleDeleteClick}
                />
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4">Total</td>
              {/* <td>{totalAmount}</td>*/}
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
