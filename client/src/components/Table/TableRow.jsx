
function TableRow(props) {
    
    const [firstElement, ...restOfArray] = props.data;

    return(
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {firstElement}
        </th>
        {restOfArray.map((item, index) => (
            <td key={index} scope="col" className="px-6 py-3">{item}</td>
        ))}
    </tr>
    );

}


export default TableRow