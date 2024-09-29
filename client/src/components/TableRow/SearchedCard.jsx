const SearchedCard = ({item, setSearchedValue}) => {
return(
    <section className="card__search">
        <div>
        {item.id}
        {item.name}
        {item.amount}
        {item.description}
        {item.method}
        {item.user_id}
        {item.date}
        {item.name}             
        </div>
    </section>
)

}

export default SearchedCard;