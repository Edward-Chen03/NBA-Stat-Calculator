
import React, { useState, useEffect } from 'react';
import TableRow from "../TableRow.jsx"
import TableHeader from "../TableHeader.jsx";
import PageDropdown from '../PageDropdown.jsx';
import TableDropdown from '../TableDropdown.jsx';
import TableSearch from '../TableSearch.jsx';
import dataA from "./data.json"


// Eventually pagination will be implemented where a GET request ON already sorted data will forgo the need to import all the data, then sort it.  

function Table({ data, error }) {
    if (data === null) {
        
        return <div>Loading...</div>;
    }

    const [arrayOfJSON, setJSON] = useState(data);    
    
    // data and data formatting
    const [tableType, setTableType] = useState("Table 1")
    const header = dataA["header"];
    
    let arrangedArrayOfData = arrayOfJSON?.filter(dataItem =>
        header.some(headerItem => Object.keys(dataItem).includes(headerItem))
      )?.map(dataItem => header.map(headerItem => dataItem[headerItem])) || [];
      

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

    const originalData = arrangedArrayOfData

    // filtering data by search query
    const [filteredData, setFilteredData] = useState(arrangedArrayOfData)
    function filterData(data, searchQuery) {
        if (searchQuery == "") {
            setFilteredData(originalData)
            return data;
        }
        let result = [];

        function searchArray(array) {
            for (let i=0; i < array.length; i++) {
                const element = array[i];
                if (Array.isArray(element)) {
                    searchArray(element);
                } else if (typeof(element) === typeof(searchQuery)) {
                    
                    const stringValue = String(element).toLowerCase();
                    if (stringValue.includes(String(searchQuery).toLowerCase())) {
                        result.push(array);
                        break;
                    }
                }
            }
        }

        searchArray(data);
        setFilteredData(result);
    }

    // sorting algo for columns
    const [sortConfig, setSortConfig] = useState({column: null, direction:'asc'})
    const handleSort = (column) => {
        setSortConfig({
          key: column,
          direction: sortConfig.key === column && sortConfig.direction === 'asc' ? 'desc' : 'asc',
        });
      };

    let sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key) {
        const index = header.indexOf(sortConfig.key);
        const keyA = a[index];
        const keyB = b[index];

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
    let paginatedData = sortedData.slice(firstIndex, lastIndex + 1) // this will be replaced with a function that takes whatever is neccessary from server
    

    let startPage = Math.max(0, firstIndex + (pageNumber))
    let endPage = Math.min(lastIndex + (pageNumber), totalRows)

    return (
        <>
        <div className="flex flex-col w-full shadow-md bg-neutral700 border-8 rounded-md">
            <div className="flex flex-row justify-end text-xs items-end text-gray-700 uppercase bg-gray-50">
                <div className="px-2 py-3 mr-auto self-center">

                <div>
                    <div className="flex shrink-0">
                        <TableDropdown setTableType={setTableType}></TableDropdown>
                        <TableSearch filterData={filterData} data={arrangedArrayOfData}></TableSearch>
                    </div>
                </div>

                </div>
                <PageDropdown startPage = {startPage} endPage = {endPage} setRowsPerPage = {setRowsPerPage} setPageNumber = {setPageNumber}></PageDropdown>
                <div className='text-black w-fit px-1 py-1 self-center text-center lowercase'>of {sortedData.length}</div>
                <button className='px-2 py-3 self-center' onClick={() => handlePageChange(pageNumber - 1)}> &lt; </button>
                <button className='px-2 py-3 self-center' onClick={() => handlePageChange(pageNumber + 1)}> &gt; </button>
            </div>
            <table className="w-full h-fit text-sm text-left rtl:text-right text-black">
                <thead className="text-xs justify-between text-primary uppercase bg-secondary">
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