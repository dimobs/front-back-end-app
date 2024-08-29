import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useFocus from "../../hooks/useFocus";
import { useGetAllTableItems } from "../../hooks/useTableItem";
import Spinner from "../spinner/Spinner";
import TableDetails from "./TableDetails";
import TableRowItem from "./TableRowItem";
import "./tableRow.css";
import Notification from "../Notification/Notification";

const INITIAL_VALUE = { name: "", description: "", amount: "" };

export default function TableRow() {
  const { isAuthenticated } = useAuthContext();
  const inputFocus = useFocus();
  const loading = false;
  const [items] = useGetAllTableItems();
  const [showItem, ToggleItem] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    visible: false,
  });
  // setOnClose
  const onClose = () => {
    setNotification({ message: "", visible: false });
  };

  // onClose
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
            <div>
              <input
                className="input__table"
                ref={inputFocus}
                type="text"
                placeholder="Name"
                id="name"
                name="name"
                // value={values.name}
                // onChange={changeHandler}
              />
              <input
                className="input__table"
                type="text"
                placeholder="Description"
                id="description"
                name="description"
                // value={values.description}
                // onChange={changeHandler}
              />
              <input
                className="input__table"
                type="number"
                step="0.01"
                id="amount"
                placeholder="Amount"
                name="amount"
                // value={values.amount}
                // onChange={changeHandler}
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
                  // itemDetailsClickHandler={detailsHandler}
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
            // detailsItem={id}
            onClose={itemModalCloseHandler}
            // itemDelHandler={handleDeleteClick}

            //            // onSave={itemSaveHandler}
          />
        )}
      </div>
    </div>
  );
}
