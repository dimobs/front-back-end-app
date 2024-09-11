import { useState, useEffect, useRef } from "react";
import TableRowItem from "./TableRowItem";
import "./tableRow.css";
import TableDetails from "./tableDetails";
import Notification from "../globalStates/notification/Notification";
import Spinner from "../spinner/Spinner";
import useFocus from "../../hooks/useFocus";
import {
  useCreate,
  useCreateTableItem,
  useDelete,
  useGetAllTableItems,
  // useGetOne,
  useGetOneTableData,
} from "../../hooks/useTableItem";
import { useForm } from "../../hooks/useForm";
import itemsAPI from "../../api/item-api";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import ConfirmModal from "../../util/confirmModal/ConfirmModal";

export default function TableRow() {
  
  const { isAuthenticated } = useAuthContext();
  const INITIAL_STATE = { name: "", description: "", amount: "" };
  // const [notification, setNotification] = useState({ message: '', visible: false });
  // const { idItem } = useParams();
  const [showItem, ToggleItem] = useState(false);
  const inputFocus = useFocus();
  // const [items, loading, notification, onClose] = useAllTableData();
  // const [id, setItem] = useGetOne();
  // const [newItem, createItem] = useCreate();
  const createItem = useCreate();
  // const [items, setItems, loading, notification, setNotification, onClose] =
  //   useGetAllTableItems();
  const removeItem = useDelete();
  // create
  const formSubmitHandler = async (values) => {
    if (Object.values(values).some((v) => v == "")) {
      setNotification({ message: `All fields are required!`, visible: true });

      setTimeout(() => {
        setNotification({ message: "", visible: false });
      }, 6000);
      return;
    }
    try {
      const newItemCreated = await createItem(values);

      setItems((oldState) => [newItemCreated, ...oldState]);
      setNotification({ message: `Added successfully!`, visible: true });
      setTimeout(() => {
        setNotification({ message: "", visible: false });
      }, 6000);
    } catch (err) {
      setNotification({
        message: `Your item is not recorded! Server:${err.message}`,
        visible: true,
      });
      setTimeout(() => {
        setNotification({ message: "", visible: false });
      }, 6000);
    }
  };

  const { values, changeHandler, onsubmitHandler } = useForm(
    INITIAL_STATE,
    formSubmitHandler
  );

  // getOne
  // const detailsHandler = (id) => {
  //   ToggleItem(true);
  //   // setItem(id);
  // };

  // const [pending, setPending] = useState(false);
  // const [values, onchange] = useState(INITIAL_STATE);
  // const [items, setItems] = useState([]);
  // const [item, setItem] = useState([]);
  // const totalAmount = (items.length == 0)
  // ? ""
  // :`${(items.reduce((total, item) => total + Number(item.amount), 0)).toFixed(2)}лв.`;
  // const resetFrom = () => {onchange(INITIAL_STATE)};

  // getAll
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

  // const [item, setItem] = useGetOne();
  // const getOne = useGetOne();

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

  const handleDeleteClick = async (itemId, name) => {
  const confirmed = confirm(`Are you sure do you want to delete ${name}`)
  if (!confirmed){
      return
  }
  try{
      const result = await itemsAPI.remove(itemId);
      const restValues = items.filter((i) => i.id !== itemId);
      setItems(restValues);
      setNotification({ message: `${result[0].name} deleted successfully!`, visible: true });
      setTimeout(() => {
          setNotification({ message: '', visible: false });
      }, 4000);
      itemModalCloseHandler();
  }catch(err){
  console.error(err)
  }
  }
  // close modal
  const itemModalCloseHandler = () => {
    ToggleItem(false);
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
          <form onSubmit={onsubmit}>
            {/* <form> */}
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
              <td className="index header__items">No.</td>
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
                  // itemDetailsClickHandler={detailsHandler}
                  itemDelHandler={handleDeleteClick}
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
            detailsItem={id}
            onClose={itemModalCloseHandler}
            itemDelHandler={handleDeleteClick}

            //            // onSave={itemSaveHandler}
          />
        )}
      </div>
    </div>
  );
}
