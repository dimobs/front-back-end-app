import formatDate from "../../util/formatDate"
import { Link } from "react-router-dom"

export default function TableRowItem (
    {itemId, date, name, description, value, index, addUserClickHandler}) {
      
      function handleEdit() {
        window.alert('Going to Edit?')
        
      }

    return(
        <>
  <tr>
    <td className="index">{index}</td>
    <td >{formatDate(date)}</td>
    <td className='header__items td'>{name}</td>
    <td className="description header__items td" >{description}</td>
    <td className='header__items td'>{value}</td>
    <td>
      <button
      onClick={addUserClickHandler}
      >
    <Link to={`/item/${itemId}`} key={itemId}>Edit</Link>
      </button>
      </td>
  </tr>
        </>
    )
}