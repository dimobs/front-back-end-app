import styles from './SeachedCardCSS.module.css';

const SearchedCard = ({item, setSearchedValue}) => {
console.log(item);

    return(
    <section className={styles["card__search"]}>
        <div>
        {/* {item.id} */}
        {item.name}
        {item.method}
        {/* {item.amount}
        {item.description}
        {item.method}
        {item.user_id}
        {item.date}
        {item.name}              */}
        </div>
    </section>
)

}

export default SearchedCard;