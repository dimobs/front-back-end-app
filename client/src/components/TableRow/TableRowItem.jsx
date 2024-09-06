import formatDate from "../../util/formatDate"
// import { Link } from "react-router-dom"

export default function TableRowItem (
    {
      itemId, 
      date, 
      name, 
      description, 
      value, 
      modify,
      index, 
      username,
      itemDelHandler, 
      itemDetailsClickHandler
    }) {
      
      const editItemHandler= () =>{
        itemDetailsClickHandler(itemId)
      }

      const deleteHandler = () => {
        itemDelHandler(itemId, name)
      }
    return(
<>
  <tr>
    <td className="index">{username}</td>
    <td >{formatDate.date(date)}</td>
    <td className='header__items td'>{name}</td>  
    {description.length <= 34 
      ? <td className="description header__items td" >{description}</td>
      :  <td style={{fontSize: "0.75rem", spellCheck:"true"}} className="description header__items td">{description.slice(0, 34)}...</td>
  
    }
    <td className='header__items td'>{value}</td>
    <td>
    <button className="btn-small" title="View for more info"
    onClick={editItemHandler}>
    View
    </button>
    <button 
    className="btn-small"
    title="Comment"
    >
    Comment
    </button>
    {modify 
    ? <button
    title="This entry has been modified"
    className="btn-small"
    >
      <strong style={{color: "whitesmoke", marginTop:"5px"}}>M</strong></button>
    : <button style={{display:"none"}}></button>
  }  
   
    
    </td>
  </tr>
</>
    )
}