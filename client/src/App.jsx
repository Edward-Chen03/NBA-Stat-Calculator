
import Table from "./components/Table/Table.jsx"

function App() {

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
