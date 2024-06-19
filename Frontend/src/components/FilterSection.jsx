import { useDispatch } from "react-redux"
import FilterCard from "./FilterCard"
import { openAddModal } from "../features/filterPlacedData/filterPlacedDataSlice"

const FilterSection = ({ name = 'Undefined', data = [] }) => {
    const dispatch = useDispatch()

    function handleNewTopicAdded(e, name) {
        e.preventDefault()
        dispatch(openAddModal(name))
    }

    return (
        <div className="px-4 max-[420px]:px-1">
            <h2 className="text-2xl max-sm:text-lg border-b-[1px] border-slate-500 font-bold text-slate-500">
                {name === 'end_year' ? 'End Year' : name === 'sectors' ? 'Sectors' : name === 'topics' ? 'Topics' : name === 'regions' ? 'Regions' : name === 'pests' ? 'Pests' : name === 'sources' ? 'Sources' : name === 'country' ? 'Country' : name === 'countries' ? 'Countries' : 'Undefined'}
            </h2>
            <div className=" flex flex-wrap max-sm:px-0 p-3 items-center">
                {
                    data.length && data.map((item, index) => (
                        <div key={index}>
                            <FilterCard value={item} category={name} />
                        </div>
                    ))
                }
                {
                    <div className="p-3 text-purple-700 font-bold text-sm">
                        <button onClick={(e) => handleNewTopicAdded(e, name)}>+ Add</button>
                    </div>   
                }
            </div>
        </div>
    )
}

export default FilterSection