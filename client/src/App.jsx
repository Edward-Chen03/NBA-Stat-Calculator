
import Table from "./components/Table/Table.jsx"
import axios from 'axios';
import React, { useState, useEffect } from 'react';
function App() {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/calculate', {
          name: 'Devin Booker',
          calculate: 'TS%'
        });

        
        setData(response.data);
      } catch (error) {
        
        setError(error.message || 'An error occurred');
      }
    };

    fetchData();
  }, []); 
  console.log(data);
  return (
    <>
    <div className="flex bg-gray-500 justify-center align-middle items-center w-full h-screen">
      <h1 className="text-white text-5xl">Hello</h1>
    </div>
    <div className="bg-gray-500 w-full h-fit min-h-screen">
      <div className="mx-5 pt-52 h-fit">
        <Table></Table>
      </div>
    </div>
    <div className="bg-gray-500 w-full h-52"></div>
    </>
  )
}

export default App
