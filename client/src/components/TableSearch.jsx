import React, { useState, useEffect } from 'react';

function TableSearch(props) {

    const [searchValue, setSearchValue] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchValue(e.target.value);
        props.filterData(props.data, value);
        console.log(value == "")
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // You can perform additional actions on form submission if needed
    };

    return(
        <form id="searchForm" onSubmit={handleFormSubmit}>
            <div className="flex flex-shrink-0 w-[125%] h-full">
                <input id="search" type="search" className="flex p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 border-s-gray-50 border-s-2 border border-gray-300" 
                    value={searchValue} onChange={handleInputChange} placeholder="Search Players, Teams, etc..."/>
                <button type="submit" className="flex top-0 end-0 p-2.5 text-sm font-medium  text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800">
                    <svg className="w-4 h-4 self-center" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    <span className="sr-only">Search</span>
                </button>
            </div>
        </form>

    );

}


export default TableSearch