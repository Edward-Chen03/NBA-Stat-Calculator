import React, { useState, useEffect } from 'react';
import Table from "./components/Table.jsx";
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://nba-stat-calculator-server.onrender.com/AllPlayerTable', {});
        setData(response.data);
      } catch (error) {
        setError(error.message || 'An error occurred');
      }
    };

    fetchData();
  }, []); 
  console.log(data);
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <div class = "homePageHeader">
        <h1 className="text-white text-5xl">NBA Statistics Calculator</h1>
      </div>

      <div className="bg-gray-500 w-full h-fit min-h-screen">
      <h1 class="text-white text-3xl center-align">Current Statistical Leaders</h1>
        <div>
          <Table data={data} error={error} />
        </div>
      </div>
      <div className="bg-gray-500 w-full h-52"></div>
    </>
  );
}

export default App;
