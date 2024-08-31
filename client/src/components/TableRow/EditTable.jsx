import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import formatDateTime from "../../util/formatDate";
import { useAuthContext } from "../../context/AuthContext";
import { useForm } from "../../hooks/useForm";
import useFocus from "../../hooks/useFocus";
import {
  useGetOne,
  useGetOneForEdit,
  useGetOneTableData,
} from "../../hooks/useTableItem";
import itemsAPI, { getOne } from "../../api/item-api";

const initialValue = {
  name: "",
  description: "",
  amount: "",
};

export default function EditTable() {
  const navigate = useNavigate();
  const onClose = () => {
    navigate("/");
  };
  document.onkeydown = function (e) {
    if (e.keyCode == 27) {
      onClose();
    }
  };
  const { isAuthenticated } = useAuthContext();
  const inputFocus = useFocus();
  const { itemId } = useParams();
  const [item, setItem] = useGetOneForEdit(itemId);
  const initialFormValue = useMemo(() => Object.assign({}, initialValue, item), [item])
  const onDeleteHandler = async() => {
    const confirmed = confirm(`Are you shure you want to delete ${item.name}`)
    if (!confirmed){
      return
    }
    try {
       await itemsAPI.remove(itemId);      
      navigate('/')
    }catch (err) {
      console.log(err.message);     
    }
  }
  const { values, changeHandler, onsubmitHandler } = useForm(
    initialFormValue,
    async (values) => {
      console.log(values);
      await itemsAPI.update(itemId, values);
      navigate("/");
    }
  );

  return (
    <div className="overlay__table">
      <div className="backdrop" onClick={onClose}></div>
      <div className="modal">
        <div className="detail-container">
          <header className="headers__table">
            <h2>Edit</h2>
            <button className="btn__small close" onClick={onClose}>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="xmark"
                className="svg-inline--fa fa-xmark"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
                ></path>
              </svg>
            </button>
          </header>
          <form onSubmit={onsubmitHandler}>
            <div className="content__table">
              {/* <div className="image-container__table">
                        <img src={''} alt="avatar" className="image" />
                    </div> */}
              <div className="table-details">
                <p>
                  ID:
                  <strong>{values.id}</strong>
                </p>
                <p>
                  Name:
                  <strong>
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
                  </strong>
                </p>
                <p>
                  Description:
                  <strong>
                    <input
                      className="input__table"                
                      type="text"
                      spellCheck="true"
                      placeholder="Description"
                      id="description"
                      name="description"
                      value={values.description}
                      onChange={changeHandler}
                    />
                  </strong>
                </p>
                <p>
                  Amout:
                  <strong>
                    <input
                      className="input__table"
                      type="number"
                      step="0.01"
                      placeholder="Amount"
                      id="amount"
                      name="amount"
                      value={values.amount}
                      onChange={changeHandler}
                    />
                  </strong>
                </p>
                <p>
                  Date:
                  <strong> {formatDateTime.dateTime(values.date)}</strong>
                </p>
                <p>
                  Created on ISO-DATE: <strong>{values.date}</strong>
                </p>
                <p>
                  Modified on:{" "}
                  <strong>
                    {values.updatedAt
                      ? formatDateTime.dateTime(values.updatedAt)
                      : "It has not been changed."}
                  </strong>
                </p>
              </div>
            </div>
            {isAuthenticated && (
              <div className="btn_form_details">
                <button className="btn__details">Save</button>
                <button className="btn__details" onClick={onDeleteHandler}> Delete</button>
                <button className="btn__details" onClick={onClose}>
                  close
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
