
import React, {useState} from 'react'
import TableRow from "./TableRow.jsx"
import TableHeader from "./TableHeader.jsx";

function Table() {

    let data = [["Eddie", "Marcus' House", "35", "2", "Me"], ["Marcus", "Eddie's House", "", "5", ""]]
    let header = ["Player", "Team", "Points", "Rebounds", "Placeholder"]
    const [sortConfig, setSortConfig] = useState({column: null, direction:'asc'})

    const handleSort = (column) => {
        setSortConfig({
          key: column,
          direction: sortConfig.key === column && sortConfig.direction === 'asc' ? 'desc' : 'asc',
        });
      };
  
    const sortedData = [...data].sort((a, b) => {
        if (sortConfig.key) {
            const index = header.indexOf(sortConfig.key);
            const keyA = a[index];
            const keyB = b[index];

            if (sortConfig.direction === 'asc') {
                return keyA.localeCompare(keyB, undefined, { numeric: true, sensitivity: 'base' });
            } else {
                return keyB.localeCompare(keyA, undefined, { numeric: true, sensitivity: 'base' });
            }
        }
    
        return 0;
      });

    return (
        <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs justify-between text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <TableHeader header_data={header} sortConfig={sortConfig} onSort={handleSort}></TableHeader>
                </thead>
                <tbody>
                    {sortedData.map((item, index) => (
                        <TableRow key={index} data={item}></TableRow>
                    ))}
                </tbody>
            </table>
        </div>

        </>
    );

}


export default Table