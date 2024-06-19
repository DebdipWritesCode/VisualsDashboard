import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'

const BarChartComponent = ({ graphData = [] }) => {

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
                <h3 className=" text-base font-bold text-purple-700">Average intensity, likelihood and relevance in different regions</h3>
            </div>
            <div className='h-full'>
                <ResponsiveContainer width="95%" className=' aspect-auto'>
                    <BarChart data={graphData} margin={{ top: 30, right: 30, left: -20, bottom: 10 }}>
                        <XAxis dataKey="_id" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Legend />
                        <Tooltip />
                        <Bar dataKey="averageLikelihood" fill="#686D76" barCategoryGap="20%" name='Likelihood' />
                        <Bar dataKey="averageIntensity" fill="#DC5F00" barCategoryGap="20%" name='Intensity' />
                        <Bar dataKey="averageRelevance" fill="#97BE5A" barCategoryGap="20%" name='Relevance' />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default BarChartComponent