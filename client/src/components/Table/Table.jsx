
import React, {useState} from 'react'
import TableRow from "./TableRow.jsx"
import TableHeader from "./TableHeader.jsx";
import Dropdown from '../Helper/Dropdown.jsx';
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
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [pageNumber, setPageNumber] = useState(1)
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPageNumber(newPage);
        }
    };
    let firstIndex = (pageNumber-1) * rowsPerPage
    let lastIndex = firstIndex + rowsPerPage

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

    // numbering pages
    const totalRows = sortedData.length
    const totalPages = Math.ceil(totalRows / rowsPerPage)
    let paginatedData = sortedData.slice(firstIndex, lastIndex + 1)
    

    let startPage = Math.max(1, firstIndex + (pageNumber))
    let endPage = Math.min(lastIndex + (pageNumber), totalRows)

    return (
        <>
        <div className="flex flex-col w-full shadow-md bg-gray-500">
            <div className="flex flex-row justify-end text-xs items-end text-gray-700 uppercase bg-gray-50">
                <Dropdown startPage = {startPage} endPage = {endPage} setRowsPerPage = {setRowsPerPage} setPageNumber = {setPageNumber}></Dropdown>
                <div className='text-black w-fit px-1 py-1 self-center text-center lowercase'>of {sortedData.length}</div>
                <button className='px-2 py-3' onClick={() => handlePageChange(pageNumber - 1)}> &lt; </button>
                <button className='px-2 py-3' onClick={() => handlePageChange(pageNumber + 1)}> &gt; </button>
            </div>
            <table className="w-full h-fit text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs justify-between text-gray-700 uppercase bg-gray-50">
                    <TableHeader header_data={header} sortConfig={sortConfig} onSort={handleSort}></TableHeader>
                </thead>
                <tbody>
                    {paginatedData.map((item, index) => (
                        <TableRow propKey={index} data={item}></TableRow>
                    ))}
                </tbody>
            </table>

        </div>

        </>
    );

}


export default Table