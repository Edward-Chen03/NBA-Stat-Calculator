import React, { useState, useEffect } from 'react';
import Table from "./components/CustomTable/CustomTable.jsx";
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
    <div className='flex flex-col h-screen'>
      <span className='bg-neutral100 flex justify-between items-center pt-10 px-28 w-full h-[10%]'>
        <span className='text-primary font-sans text-3xl'>Eddie and Marcus Incorporations</span>
        <span className='text-black font-sans text-3xl'>Start Now</span>
      </span>
      <div className="bg-neutral100 text-center w-full pt-20 flex-grow">
        <h1 className="text-primary text-xl">Stats for NBA</h1>
        <h1 className="text-neutral800 text-5xl pt-2">Stats for NBA</h1>
        <h2 className='text-neutral600 text-xl text-wrap break-words w-1/2 mx-auto pt-5'>Welcome to our NBA Stats and Calculator website, where passion meets precision! 
        Dive into the world of basketball analytics with comprehensive NBA statistics, offering a detailed breakdown of player performance, 
        team dynamics, and game trends. Elevate your basketball experience with our intuitive NBA Calculator, empowering you to analyze player stats, 
        simulate scenarios, and explore the intricacies of the game. Whether you're a dedicated fan, fantasy player, or a strategic analyst, our platform provides the 
        tools you need to unravel the excitement and strategy behind every NBA moment.</h2>
      </div>
    </div>
    <div className='flex flex-col h-screen'> 
      <div className="flex justify-center pt-10">
        <h1 className="text-black text-5xl">NBA Statistics Calculator</h1>
      </div>
      <div className='pt-10'>
        <Table data={data} error={error} />
      </div>
    </div>
    </>
  );
}

export default App;
