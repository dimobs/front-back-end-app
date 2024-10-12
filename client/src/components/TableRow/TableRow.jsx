import { useEffect, useState } from "react";

import "./tableRow.css";

import { useAuthContext } from "../../context/auth/AuthContext";
import { useLoading } from "../../context/spinner/SpinnerContext";
import { useError } from "../../context/notification/ErrorContext";
import useFocus from "../../hooks/useFocus";
import { useForm } from "../../hooks/useForm";
import { useCreate, useGetAllTableItems } from "../../hooks/useTableItem";
import TableDetails from "./TableDetails";
import TableRowItem from "./TableRowItem";
import itemsAPI from "../../api/item-api";
import { useConfirm } from "../../context/notification/confirmModal/ConfirmContext";
import SearchedCard from "./SearchedCard";

const INITIAL_VALUE = { name: "", description: "", amount: "", method: "" };

export default function TableRow() {
  const { confirm } = useConfirm();
  const { setError } = useError();
  const { setLoading } = useLoading();
  const { isAuthenticated, setTotalAmount } = useAuthContext();
  const cursorPointer = useFocus();
  const [showItem, setShowItem] = useState(false);
  const [searchedValue, setSearchedValue] = useState("");
  const [matchedItems, setMatchedItems] = useState([]);
  // getOne
  const [item, setItem] = useState([]);
  // getall
  const [items, setItems] = useGetAllTableItems();
  // total Amount
  const totalAmount =
    items.length === 0
      ? ""
      : `${items
          .reduce((total, x) => {
            return x.method === "subtract"
              ? total - Number(x.amount)
              : total + Number(x.amount);
          }, 0)
          .toFixed(2)}лв.`;

  useEffect(() => {
    if (items.length > 0) {
      setTotalAmount(
        items
          .reduce((total, x) => {
            return x.method === "subtract"
              ? total - Number(x.amount)
              : total + Number(x.amount);
          }, 0)
          .toFixed(2)
      );
    }
  }, [items, setTotalAmount]);

  // createGETTER
  const createItem = useCreate();

  // createSetter
  const createHandler = async (values) => {
    if (
      !values.name ||
      !values.description ||
      !values.amount ||
      !values.method
    ) {
      setError(
        `Your entry has not been saved. All fields are required`,
        "error"
      );
      return;
    }
    try {
      setLoading(true);
      const newItemCreated = await createItem(values);
      setItems((oldState) => [newItemCreated, ...oldState]);
      setError(
        `Your payment ${newItemCreated.name} created successful`,
        "success"
      );
    } catch (err) {
      setError(err.message, "error");
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  const { values, changeHandler, onsubmitHandler } = useForm(
    INITIAL_VALUE,
    createHandler
  );

  // getOne
  const detailsHandler = async (i) => {
    setShowItem(true);
    setItem(i);
  };

  // onClose
  const itemModalCloseHandler = () => {
    setShowItem(false);
  };

  const onDeleteHandler = async (i) => {
    try {
      setLoading(true);
      const confirmed = await confirm(
        `Are you sure you want to delete ${i.name}?`
      );
      if (!confirmed) {
        setError("No changes has been made", "warning");
        return;
      }
      const response = await itemsAPI.remove(i.id);
      setItems(items.filter((x) => x.id != i.id));
      setShowItem(false);
      setError(
        `Successfully deleted id${response.id} with name ${response.name}`,
        "success",
        8000
      );
    } catch (err) {
      setError(err.message, "error");
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  function onChangeSearchBar(e) {
    const searchTerm = e.target.value.toLowerCase();
   
    const filteredItems = items.filter((item) => {      
      return (
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.amount.toString().toLowerCase().includes(searchTerm) ||
        item.id.toString().toLowerCase().includes(searchTerm) ||
        item.user_id.toString().toLowerCase().includes(searchTerm) ||
        item.method.toLowerCase().includes(searchTerm) ||
        // item.username.email.toLowerCase().includes(searchTerm) ||
        (item.date && item.date.includes(searchTerm))
      );
    });

    setSearchedValue(e.target.value);
    setMatchedItems(filteredItems);
  }

  return (
    <div>
      <div className="table__body">
        <h1>Dashboard</h1>
        <section className="search__container">
          <div>
            <input
              className="search__input"
              type="search"
              placeholder="Search..."
              value={searchedValue}
              onChange={onChangeSearchBar}
            />
          </div>
          {searchedValue && matchedItems.length >= 1 && (            
            <div className="discovered__table">
              {matchedItems.map((i) => (
                <SearchedCard
                  key={i.id}
                  item={i}
                  setSearchedValue={setSearchedValue}
                  itemDetailsClickHandler={() => {
                    detailsHandler(i);
                  }}
                />
              ))}
            </div>
          )}
        </section>
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
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^A-Za-z0-9\s]/g, "");
                }}
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
                // aria-valuetext="Spend"
                // style={{ background: "red" }}
                id="type"
                name="method"
                value={values.method}
                onChange={changeHandler}
              >
                <option value="">Select</option>
                <option style={{ color: "red" }} value="subtract">
                  Spend
                </option>
                <option style={{ color: "green" }} value="add">
                  +Add funds
                </option>
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
                deleteHandler={() => {
                  onDeleteHandler(i);
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
            deleteHandler={() => {
              onDeleteHandler(item);
            }}

            //            // onSave={itemSaveHandler}
          />
        )}
      </div>
    </div>
  );
}
