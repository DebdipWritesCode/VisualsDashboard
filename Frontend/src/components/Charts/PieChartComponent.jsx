import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend, Cell } from "recharts"

const PieChartComponent = ({ graphData = [] }) => {

    if (graphData.length === 0) {
        return (
            <div className=" w-full flex flex-col text-center">
                <div className=" p-3">
                    <h3 className=" text-base font-bold text-purple-700">Average intensity based on added date</h3>
                </div>
                <div className='h-full'>
                    <div className="flex justify-center items-center h-full">
                        <h3 className="m-4 text-gray-500 text-4xl">Sorry, no data availabe for the applied filters, please try setting other filters.</h3>
                    </div>
                </div>
            </div>
        )
    }

    const colors = ['#3572EF', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf', '#1a9850', '#fdae61', '#d73027', '#f46d43', '#4575b4', '#91bfdb', '#d9ef8b', '#a6d96a', '#6a3d9a', '#ff33ff', '#ff6666'];

    return (
        <div className=" w-full flex flex-col text-center">
            <div className=" p-3">
                <h3 className=" text-base font-bold text-purple-700">Topic Distribution</h3>
            </div>
            <div className='h-full'>
                <ResponsiveContainer width="95%" className=' aspect-auto'>
                    <PieChart margin={{ top: 30, right: 0, left: 40, bottom: 10 }}>
                        <Legend />
                        <Tooltip />
                        <Pie data={graphData} dataKey='count' nameKey='_id' cx="50%" cy="50%" outerRadius={100} label>
                            {
                                graphData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))
                            }
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default PieChartComponent