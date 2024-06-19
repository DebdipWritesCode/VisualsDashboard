import { useEffect, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { FaCircleCheck } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addFilter, removeFilter } from "../features/filterModal/filterModalSlice";

const FilterCard = ({ value = 'undefined', category }) => {
    const dispatch = useDispatch()
    const [isChecked, setIsChecked] = useState(false)

    function handleCheck(e) {
        e.preventDefault()
        setIsChecked(!isChecked)
    }

    useEffect(() => {
        if (isChecked) {
            dispatch(addFilter({ filterType: category, filterValue: value }));
        } else {
            dispatch(removeFilter({ filterType: category, filterValue: value }));
        }
    }, [isChecked]);

    return (
        <div>
            <button onClick={(e) => handleCheck(e)} className={(isChecked ? ` border-purple-700 border-2 rounded-2xl` : `border-2 border-slate-300 rounded-2xl`) + ` flex gap-2 p-2 m-1 cursor-pointer max-[484px]:p-[6px] max-[484px]:text-sm`}>
                {
                    isChecked ? <FaCircleCheck color="rgb(126, 34, 206)" size={20} /> : <CiCircleCheck color="rgb(126, 34, 206)" size={20} />
                }
                <p>{value}</p>
            </button>
        </div>
    )
}

export default FilterCard