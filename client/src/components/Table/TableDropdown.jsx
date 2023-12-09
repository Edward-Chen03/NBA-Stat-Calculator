
import React, { useEffect } from 'react';

function TableDropdown(props) {

    function myFunction() {
        document.getElementById("myTableDropdown").classList.toggle("hidden");
        document.getElementById("dropdownIcon").classList.toggle("rotate-180");
    }
      
    // Close the dropdown menu if the user clicks outside of it
    useEffect(() => {
        function handleWindowClick(event) {
          const dropdownContainer = document.getElementById("tableDropdown");
          const dropdown = document.getElementById("myTableDropdown");
          const dropdownIcon = document.getElementById("dropdownIcon");
    
          if (
            dropdown &&
            dropdownIcon &&
            event.target !== dropdownContainer &&
            !dropdownContainer.contains(event.target) &&
            !dropdown.classList.contains("hidden")
          ) {
            dropdown.classList.toggle("hidden");
            dropdownIcon.classList.toggle("rotate-180");
          }
        }
    
        // Attach the event listener when the component mounts
        window.addEventListener("click", handleWindowClick);
    
        // Detach the event listener when the component unmounts
        return () => {
          window.removeEventListener("click", handleWindowClick);
        };
    }, []);

    return (

        
        <div id="tableDropdown" className="flex-shrink-0 w-[40%]">
            <button className="flex-shrink-0 w-full z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 " type="button" onClick={myFunction}>
                All categories 
                <svg id="dropdownIcon" className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>

            <div id="myTableDropdown" className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow flex-shrink-0 w-1/4 hidden">
                <ul className="py-2 text-sm text-gray-700">
                <li>
                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
                </li>
                <li>
                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
                </li>
                <li>
                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
                </li>
                <li>
                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
                </li>
                </ul>
            </div>
        </div>
                
    );
}


export default TableDropdown