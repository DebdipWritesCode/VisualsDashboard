import { CartesianGrid, ComposedChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, Area, Bar, Line } from "recharts"

const ComposedChartComponent = ({ graphData = [] }) => {

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
        <h3 className=" text-base font-bold text-purple-700">Average intensity, likelihood and relevance in different sectors</h3>
      </div>
      <div className='h-full'>
        <ResponsiveContainer width="95%" className=' aspect-auto'>
          <ComposedChart data={graphData} margin={{ top: 30, right: 10, left: 10, bottom: 10 }}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Area type="monotone" dataKey="averageLikelihood" fill="#ADD8E6" stroke="#8884d8" />
            <Bar dataKey="averageIntensity" barSize={20} fill="#9ACD32" />
            <Line type="monotone" dataKey="averageRelevance" stroke="#FF5733" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ComposedChartComponent