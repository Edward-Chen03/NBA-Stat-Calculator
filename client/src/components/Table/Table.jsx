
import React, {useState} from 'react'
import TableRow from "./TableRow.jsx"
import TableHeader from "./TableHeader.jsx";
import data from "../../data.json"


// Eventually pagination will be implemented where a GET request ON already sorted data will forgo the need to import all the data, then sort it.  

function Table() {
    
    // data and data formatting
    const header = data["header"]
    const arrayOfJSON = data["data"]
    let arrangedArrayOfData = arrayOfJSON
    .filter(dataItem => header.some(headerItem => Object.keys(dataItem).includes(headerItem)))
    .map(dataItem => header.map(headerItem => dataItem[headerItem]));

    // pages
    const rowsPerPage = 10
    const [pageNumber, setPageNumber] = useState(1)
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPageNumber(newPage);
        }
    };
    let firstIndex = (pageNumber-1) * rowsPerPage
    let lastIndex = firstIndex + rowsPerPage + 1

    // sorting algo for columns
    const [sortConfig, setSortConfig] = useState({column: null, direction:'asc'})
    const handleSort = (column) => {
        setSortConfig({
          key: column,
          direction: sortConfig.key === column && sortConfig.direction === 'asc' ? 'desc' : 'asc',
        });
      };
    let sortedData = [...arrangedArrayOfData].sort((a, b) => {
    if (sortConfig.key) {
        const index = header.indexOf(sortConfig.key);
        const keyA = a[index];
        const keyB = b[index];
        console.log(keyA)

        if (sortConfig.direction === 'asc') {
            return keyA > keyB ? 1 : -1;
        } else {
            return keyA < keyB ? 1 : -1;
        }
    }

    return 0;
    });


    const totalPages = Math.ceil(sortedData.length / 10)
    let paginatedData = sortedData.slice(firstIndex, lastIndex)


    return (
        <>
        <div className="flex flex-col w-full shadow-md bg-gray-500">
            <div className="flex flex-row justify-end text-xs items-end text-gray-700 uppercase bg-gray-50">
                <button className='px-6 py-3' onClick={() => handlePageChange(pageNumber - 1)}>Previous</button>
                <div className='text-black w-6 px-1 py-1 self-center text-center'>{pageNumber}/{totalPages}</div>
                <button className='px-6 py-3' onClick={() => handlePageChange(pageNumber + 1)}>Next</button>
            </div>
            <table className="w-full h-fit text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs justify-between text-gray-700 uppercase bg-gray-50">
                    <TableHeader header_data={header} sortConfig={sortConfig} onSort={handleSort}></TableHeader>
                </thead>
                <tbody>
                    {paginatedData.map((item, index) => (
                        <TableRow key={index} data={item}></TableRow>
                    ))}
                </tbody>
            </table>
        </div>

        </>
    );

}


export default Table