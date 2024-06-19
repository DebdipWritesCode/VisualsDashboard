import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'

const BottomBarChartComponent = ({ graphData = [] }) => {

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

    return (
        <div className=" w-full flex flex-col text-center">
            <div className=" p-3">
                <h3 className=" text-base font-bold text-purple-700">Country Distribution</h3>
            </div>
            <div className='h-full'>
                <ResponsiveContainer width="95%" className=' aspect-auto'>
                    <BarChart data={graphData} margin={{ top: 30, right: 30, left: -20, bottom: 10 }}>
                        <XAxis dataKey="_id" />
                        <YAxis tickCount={30} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Legend />
                        <Tooltip />
                        <Bar dataKey="count" fill="#228B22" barCategoryGap="20%" name='Ocurrence Count' />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default BottomBarChartComponent