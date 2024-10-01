import formatDateTime from "../../util/formatDate";
import styles from "./SeachedCardCSS.module.css";

const SearchedCard = ({ item, setSearchedValue, itemDetailsClickHandler }) => {
  const editItemHandler = () => {
    itemDetailsClickHandler(item.id);
  };
  return (
    <section className={styles["card__search"]}>
      <div className={styles["field"]}>
        <span>
          <table>
            <tr>
              <td>{formatDateTime.date(item.date)}</td>
              <td>{item.name}</td>
              <td>{item.amount}</td>
              <td>
          <button
            className="btn-small"
            title="View for more info"
            onClick={editItemHandler}
          >
            View
          </button>
          </td>
            </tr>
        
          </table>
        </span>
        {/* {item.amount}
        {item.description}
        {item.method}
        {item.user_id}
        {item.date}
        {item.name}              */}
      </div>
    </section>
  );
};

export default SearchedCard;
