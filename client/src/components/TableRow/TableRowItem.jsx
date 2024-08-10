import formatDate from "../../util/formatDate"

export default function TableRowItem (
    {id, date, name, description, value, index}) {
      
      function handleEdit() {
        window.alert('Going to Edit?')
        
      }

    return(
        <>
  <tr>
    <td className="index">{index}</td>
    <td >{date}</td>
    <td className='header__items td'>{name}</td>
    <td className="description header__items td" >{description}</td>
    <td className='header__items td'>{value}</td>
    <td>
    <button className="btn-submit" onClick={handleEdit}>
edit
            </button>
    <button onClick={(e)=> handleDel()}>Del</button>
      </td>
  </tr>
        </>
    )
}