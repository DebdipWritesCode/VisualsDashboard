import { useDispatch, useSelector } from "react-redux"
import { applyFilters, closeModal } from "../features/filterModal/filterModalSlice"
import FilterSection from "./FilterSection"
import { addItem, closeAddModal } from "../features/filterPlacedData/filterPlacedDataSlice"
import { useState } from "react"
import { ImCancelCircle } from "react-icons/im";

const FilterModal = () => {
    const dispatch = useDispatch()
    const { countFilters, filter } = useSelector((state) => state.modal)
    const { end_year, topics, sectors, regions, pests, sources, countries, isAddModalOpen } = useSelector((state) => state.filterData)

    const [newValue, setNewValue] = useState('')

    function handleCloseModal(e) {
        e.preventDefault()
        dispatch(closeModal())
    }

    function handleFilterApply(e) {
        e.preventDefault()
        dispatch(closeModal())
        dispatch(applyFilters())
    }

    return (
        <div className="absolute w-screen h-screen top-0">
            <div className="backdrop bg-purple-300 w-screen h-screen top-0 opacity-45 fixed">
            </div>
            <div className="z-10 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[70%] h-[500px] md:w-[60%] bg-[#fff1fb] overflow-y-scroll px-5 rounded-2xl shadow-2xl">
                <form>
                    <div className="flex justify-between items-center">
                        <h3 className={countFilters ? ` text-[14px] font-bold m-4 p-2 w-max bg-purple-700 rounded-3xl text-purple-100 shadow-slate-400 shadow-lg` : '` text-[14px] font-bold m-4 p-2 w-max bg-white rounded-3xl text-purple-700 shadow-xl shadow-purple-500`'}>
                            {countFilters > 1 ? `${countFilters} filters applied` : countFilters === 1 ? `${countFilters} filter applied` : 'No filters applied'}
                        </h3>
                        <ImCancelCircle onClick={(e) => handleCloseModal(e)} size={20} className="text-slate-500 cursor-pointer" />
                    </div>
                    <FilterSection name="end_year" data={end_year} />
                    <FilterSection name="topics" data={topics} />
                    <FilterSection name="sectors" data={sectors} />
                    <FilterSection name="regions" data={regions} />
                    <FilterSection name="pests" data={pests} />
                    <FilterSection name="sources" data={sources} />
                    <FilterSection name="countries" data={countries} />
                    <div className="flex items-center h-10 my-5 mx-4 gap-6">
                        <button onClick={(e) => handleFilterApply(e)} className="bg-purple-700 py-2 px-7 text-base font-bold text-white rounded-2xl shadow-xl hover:bg-purple-900">Apply Filters</button>
                    </div>
                </form>
            </div>
            {
                isAddModalOpen &&
                <div className="absolute w-screen h-screen top-0">
                    <div className="backdrop fixed z-20 bg-purple-900 w-screen h-screen top-0 opacity-65">
                    </div>
                    <div className="z-30 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[250px] h-[150px] bg-white flex flex-col items-center justify-center gap-2 rounded-xl">
                        <label htmlFor="item" className="font-bold">Add Item</label>
                        <input onChange={(e) => setNewValue(e.target.value)} type="text" id="item" name="item" className="border-2 border-black" />
                        <div className=" flex justify-between gap-4">
                            <button onClick={() => dispatch(addItem(newValue))} className="p-3 py-0 bg-green-600 text-white font-bold">Add</button>
                            <button onClick={() => dispatch(closeAddModal())} className=" p-3 bg-red-600 text-white font-bold">Cancel</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default FilterModal