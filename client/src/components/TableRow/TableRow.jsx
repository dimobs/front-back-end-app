import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useFocus from "../../hooks/useFocus";
import { useCreate, useGetAllTableItems } from "../../hooks/useTableItem";
import Spinner from "../spinner/Spinner";
import TableDetails from "./TableDetails";
import TableRowItem from "./TableRowItem";
import "./tableRow.css";
import Notification from "../Notification/Notification";
import { useForm } from "../../hooks/useForm";

const INITIAL_VALUE = { name: "", description: "", amount: "", method: "" };

export default function TableRow() {
  const { isAuthenticated, setTotalAmount } = useAuthContext();  
  const cursorPointer = useFocus();
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
  const [items, setItems] = useGetAllTableItems();

//   const subtractAll = () => {
//     let total = 0;
//     let temp = total
//   items.forEach((x) => {
//     console.log(x.TYPE, '1');
    
//   if (x.TYPE === "subtract" ){
//     console.log(x.TYPE, '2 sub');

//     temp -= Number(x.amount)
//   }else {
//     console.log(x.TYPE, '3 add');

//     temp += Number(x.amount)
//   }
//   total = 0
// })
//   return (temp.toFixed(2))
//     }
//       console.log(subtractAll());
      

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
    console.log(values, "values");

    if (!values.name || !values.description || !values.amount || !values.method) {
      return;
    }
    try {
      const newItemCreated = await createItem(values);
      setItems((oldState) => [newItemCreated, ...oldState]);
    } catch (err) {
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
              <select
                className="input__table"
                id="type"
                name="method"
                value={values.method}
                onChange={changeHandler}                
              >
                <option value="">Select</option>
                <option value="subtract">Spend -</option>
                <option value="add">Add funds +</option>
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
                  username={i.username?.email?.split("@")[0]}
                  type={i.method}
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
