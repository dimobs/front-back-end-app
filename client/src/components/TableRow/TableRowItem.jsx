import { useNavigate } from "react-router-dom";
import itemsAPI from "../../api/item-api";
import { useConfirm } from "../../context/notification/confirmModal/ConfirmContext";
import { useError } from "../../context/notification/ErrorContext";
import formatDate from "../../util/formatDate";
import { useLoading } from "../../context/spinner/SpinnerContext";
// import { Link } from "react-router-dom"

export default function TableRowItem({
  itemId,
  method,
  date,
  name,
  description,
  value,
  modify,
  index,
  username,
  deleteHandler,
  itemDetailsClickHandler,
}) {
  
  const editItemHandler = () => {
    itemDetailsClickHandler(itemId);
  };


  return (
    <>
      <tr title={username}>
        <td className="index">{username}</td>
        <td>{formatDate.date(date)}</td>
        <td className="header__items td">{name}</td>
        {description.length <= 34 ? (
          <td className="description header__items td">{description}</td>
        ) : (
          <td
            style={{ fontSize: "0.75rem", spellCheck: "true" }}
            className="description header__items td"
          >
            {description.slice(0, 34)}...
          </td>
        )}
        {method == "add" ? (
          <td
            style={{ color: "rgba(200, 247, 197)", fontWeight: "900" }}
            className="header__items td"
          >
            {value}
          </td>
        ) : (
          <td
            style={{ color: "#ff7878", fontWeight: "900" }}
            className="header__items td"
          >
            {value}
          </td>
        )}
        <td>
          <button
            className="btn-small"
            title="View for more info"
            onClick={editItemHandler}
          >
            View
          </button>

          <button
            className="btn-small"
            title="Delete?"
            onClick={deleteHandler}
          >
            Del
          </button>
          <button className="btn-small" title="Comment">
            Comment
          </button>
          {modify ? (
            <button title="This entry has been modified" className="btn-small">
              <strong style={{ color: "whitesmoke", marginTop: "5px" }}>
                M
              </strong>
            </button>
          ) : (
            <button style={{ display: "none" }}></button>
          )}
        </td>
      </tr>
    </>
  );
}
