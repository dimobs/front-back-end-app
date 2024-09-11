import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/auth/AuthContext";
import useFocus from "../../hooks/useFocus";
import { useCreate, useGetAllTableItems } from "../../hooks/useTableItem";
import TableDetails from "./TableDetails";
import TableRowItem from "./TableRowItem";
import "./tableRow.css";
// import Notification from "../../context/notification/ErrorNotification";
import { useForm } from "../../hooks/useForm";
import { useLoading } from "../../context/spinner/SpinnerContext";
import { useError } from "../../context/notification/ErrorContext";

const INITIAL_VALUE = { name: "", description: "", amount: "", method: "" };

export default function TableRow() {
  const {setError} = useError();
  const {setLoading} = useLoading();
  const { isAuthenticated, setTotalAmount } = useAuthContext();  
  const cursorPointer = useFocus();
  const [showItem, setShowItem] = useState(false);
  // const [notification, setNotification] = useState({
  //   message: "",
  //   visible: false,
  // });
  // getOne
  const [item, setitem] = useState([]);
  // getall
  const [items, setItems] = useGetAllTableItems();    
  const totalAmount = (items.length === 0) 
  ? ""
  : `${(items.reduce((total, x) => {
      return x.method === 'subtract' 
      ? total - Number(x.amount) 
      : total + Number(x.amount);
    }, 0)).toFixed(2)}лв.`;

  useEffect(() => {
    if (items.length > 0) {
      setTotalAmount(
        items.reduce(
          (total, x) => {
            return x.method === "subtract"
            ? total - Number(x.amount)
            : total + Number(x.amount);
          }, 0)
          .toFixed(2));
        }}, [items, setTotalAmount]);

  // createGETTER
  const createItem = useCreate();

  // createSetter
  const createHandler = async (values) => {
    if (!values.name || !values.description || !values.amount || !values.method) {    
      setError(`Your entry has not been saved. All fields are required`, "error", 6000)
      return;
    }
    try {
      setLoading(true);
      const newItemCreated = await createItem(values);
      setItems((oldState) => [newItemCreated, ...oldState]);      
      setError(`Your item ${newItemCreated.namew} created successfully`, 'success')
    } catch (err) {
      setError(err.message)
      console.error(err.message);
    }finally {
      setLoading(false);
    }
  };
  const { values, changeHandler, onsubmitHandler } = useForm(
    INITIAL_VALUE,
    createHandler
  );

  // setOnClose
  const onClose = () => {
    // setNotification({ message: "", visible: false });
  };

  // getOne
  const detailsHandler = async (i) => {
    setShowItem(true);
    setitem(i);
  };

  // onClose
  const itemModalCloseHandler = () => {
    setShowItem(false);
  };
  return (
    <div>
      <div className="table__body">
        <h1>Dashboard</h1>
        {/* <Notification
          message={notification.message}
          visible={notification.visible}
          onClose={onClose}
        /> */}

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
                placeholder="Paid for..."
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
              <select
                className="input__table"
                id="type"
                name="method"
                value={values.method}
                onChange={changeHandler}                
              >
                <option  value="">Select</option>
                <option style={{color: "red"}} value="subtract">Spend</option>
                <option style={{color: "green"}} value="add">+Add funds</option>
              </select>
              <button className="btn-submit form__submit">Add Entry</button>
            </div>
          </form>
        )}
        <table className="table__container">
          <thead>
            <tr>
              <th className="header__items">User</th>
              <th className="header__items">Date</th>
              <th className="header__items">Paid for...</th>
              <th className="header__items">Description</th>
              <th className="header__items">Value</th>
              <th className="header__items controls">Controls</th>
            </tr>
          </thead>
          <tbody>
             {items.map((i, idx) => (
                <TableRowItem
                  key={i.id}
                  username={i.username?.email?.split("@")[0]}
                  method={i.method}
                  itemId={i.id}
                  date={i.date}
                  name={i.name}
                  description={i.description}
                  value={i.amount}
                  modify={i.updatedAt}
                  index={idx + 1}
                  itemDetailsClickHandler={() => {
                    detailsHandler(i);
                  }}

                  // itemDelHandler={handleDeleteClick}
                />
                ))}
          
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
