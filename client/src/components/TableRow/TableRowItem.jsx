import formatDate from "../../util/formatDate"
// import { Link } from "react-router-dom"

export default function TableRowItem (
    {itemId, 
      date, 
      name, 
      description, 
      value, 
      index, 
      itemDelHandler, 
      itemDetailsClickHandler}) {
      
      const editItemHandler= () =>{
        itemDetailsClickHandler(itemId)
      }

      const deleteHandler = () => {
        itemDelHandler(itemId, name)
      }


    return(
<>
  <tr>
    <td className="index">{index}</td>
    <td >{formatDate.date(date)}</td>
    <td className='header__items td'>{name}</td>
    <td className="description header__items td" >{description}</td>
    <td className='header__items td'>{value}</td>
    <td>
    <button
    onClick={editItemHandler}>
    Edit
    </button>
    <button
    onClick={deleteHandler}>
    Del
    </button>
    </td>
  </tr>
</>
    )
}