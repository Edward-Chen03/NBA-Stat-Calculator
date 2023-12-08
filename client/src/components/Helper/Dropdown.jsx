
function Dropdown(props) {

    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("hidden");
    }
      
    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function(event) {
        var dropdownContainer = document.getElementById("dropdown");
        if (event.target !== dropdownContainer && !dropdownContainer.contains(event.target)) {
            var dropdown = document.getElementById("myDropdown");
            if (!dropdown.classList.contains("hidden")) {
                dropdown.classList.toggle("hidden");
            }
        }
    }

    return (
        <div id="dropdown" className="self-center">
            <button className="w-fit h-fit text-gray-600 rounded-lg text-xs px-1 py-1.5 flex " type="button" onClick={myFunction}>
                {props.startPage} - {props.endPage}
            </button>
            <div id="myDropdown" className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 hidden">
                <ul className="py-2 text-sm text-gray-700">
                    <li>
                        <a onClick={() => {props.setRowsPerPage(5); props.setPageNumber(1);}} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">5</a>
                    </li>
                    <li>
                        <a onClick={() => {props.setRowsPerPage(10); props.setPageNumber(1);}} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">10</a>
                    </li>
                    <li>
                        <a onClick={() => {props.setRowsPerPage(15); props.setPageNumber(1);}} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">15</a>
                    </li>
                    <li>
                        <a onClick={() => {props.setRowsPerPage(20); props.setPageNumber(1);}} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">20</a>
                    </li>
                </ul>
            </div>
        </div>
                
    );
}


export default Dropdown