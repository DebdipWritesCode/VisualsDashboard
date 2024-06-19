import { FaFilter } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { openModal } from "../features/filterModal/filterModalSlice";

const Filter = () => {
    const dispatch = useDispatch()

    return (
        <div className=" py-14 px-20 w-full h-10 flex items-center max-sm:justify-center">
            <div className=" flex">
                <button onClick={() => dispatch(openModal())} className="flex items-center p-3 bg-slate-100 shadow-xl font-semibold rounded-lg gap-2 hover:bg-purple-200">
                    <p className=" text-purple-700 font-sans text-lg">Filters</p>
                    <FaFilter color="rgb(126, 34, 206)" size={14} />
                </button>
            </div>

        </div>
    )
}

export default Filter