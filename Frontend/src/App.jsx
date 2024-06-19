import ChartsContainer from "./components/ChartsContainer"
import Filter from "./components/Filter"
import FilterModal from "./components/FilterModal"
import Navbar from "./components/Navbar"
import { useSelector } from "react-redux"

function App() {
  const { isModalOpen } = useSelector((state) => state.modal)

  return (
    <>
      <Navbar />
      <Filter />
      {
        isModalOpen && <FilterModal />
      }
      <ChartsContainer />
    </>
  )
}

export default App
