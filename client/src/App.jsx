import React, { useState, useEffect } from 'react';
import Table from "./components/Table.jsx";
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/AllPlayerTable', {});
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
      <span className='bg-neutral100 flex justify-between items-center pt-10 px-28 w-full h-[10%]'>
        <span className='text-primary font-sans text-3xl'>Logo and Name</span>
        <span className='text-black font-sans text-3xl'>Start Now</span>
      </span>
      <div className="bg-neutral100 text-center w-full h-screen pt-20">
        <h1 className="text-primary text-xl">Stats for NBA</h1>
        <h1 className="text-neutral800 text-5xl pt-2">Stats for NBA</h1>
        <h2 className='text-neutral600 text-xl text-wrap break-words w-1/2 mx-auto pt-5'>Description blah blah blah blah blah blah blah blah blah blah blah blah  
          blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah</h2>
      <div class = "homePageHeader">
        <h1 className="text-white text-5xl">NBA Statistics Calculator</h1>
      </div>

      <div className="bg-gray-500 w-full h-fit min-h-screen">
      <h1 class="text-white text-3xl center-align">Current Statistical Leaders</h1>
        <div>
          <Table data={data} error={error} />
        </div>
      </div>
      <span className="bg-neutral100 w-full h-52"></span>
    </>
  );
}

export default App;
