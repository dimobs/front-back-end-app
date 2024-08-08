import formatDate from "../../util/formatDate"

export default function TableRowItem (
    {id, date, name, description, value}) {
      const farmatedDate = formatDate(date);
      // console.log(farmatedDate);
      
    return(
        <>
  <tr key={id}>
    <td>{date}</td>
    <td>{name}</td>
    <td>{description}</td>
    <td>{value}</td>
  </tr>
        </>
    )
}