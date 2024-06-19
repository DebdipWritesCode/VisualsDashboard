import { LuLayoutDashboard } from "react-icons/lu";

const Navbar = () => {
  return (
    <div className=" flex justify-between items-center h-12 w-full p-4 mt-5 max-sm:p-1">
        <div className="flex items-center h-7 gap-2 max-sm:gap-0">
            <h2 className=" text-purple-700 text-4xl font-bold pl-5 max-sm:text-3xl max-sm:pl-1">Dashboard</h2>
            <LuLayoutDashboard color="rgb(126, 34, 206)" size={35} className="max-sm:h-8" />
        </div>
        <div className=" flex mr-3 max-sm:hidden">
            <h3 className="font-bold text-xl text-slate-700">Created by Debdip Mukherjee</h3>
        </div>
    </div>
  )
}

export default Navbar