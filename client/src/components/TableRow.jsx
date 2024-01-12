
function TableRow(props) {
    
    const [firstElement, ...restOfArray] = props.data;

    return(
    <tr className={props.propKey % 2 === 0 ? "bg-neutral100" : "bg-neutral400"}>
        <th scope="row" className="px-6 py-4 font-medium w-40 text-gray-900  dark:text-white">
            {firstElement}
        </th>
        {restOfArray.map((item, index) => (
            <td key={index} className="w-40 px-6 py-3">{item}</td>
        ))}
    </tr>
    );

}


export default TableRow