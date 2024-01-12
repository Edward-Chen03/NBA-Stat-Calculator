
function TableHeader(props) {

    const header_data = props.header_data

    return(
        <tr>
            {header_data.map((header_col, index) => (
                <th key={index} scope="col" className="px-6 py-3 w-40 box-border">
                    <button 
                    className="relative inset-0 p-1 cursor-pointer"
                    onClick={() => props.onSort(header_col)}
                    >
                        {header_col.toUpperCase()}
                        {header_col === props.sortConfig.key ? (
                            <span className="ml-1">
                                {props.sortConfig.direction === 'asc' ? '▲' : '▼'}
                            </span>
                        ) : (
                            <span className="ml-1 w-[10px] inline-block"> 
                                &nbsp;
                            </span>
                        )}
                    </button>
                </th>
            ))}
        </tr>
    );

}


export default TableHeader