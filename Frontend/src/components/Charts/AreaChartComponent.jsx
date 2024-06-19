import { CartesianGrid, Legend, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Line, AreaChart, Area } from "recharts"

const AreaChartComponent = ({ graphData = [] }) => {

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
        <h3 className=" text-base font-bold text-purple-700">Average intensity based on added date</h3>
      </div>
      <div className='h-full'>
        <ResponsiveContainer width="95%" className=' aspect-auto'>
          <AreaChart data={graphData} margin={{ top: 30, right: 10, left: 0, bottom: 10 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="2%" stopColor="#6BB8ED" stopOpacity={0.8} />
                <stop offset="98%" stopColor="#1E90FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" name="Month" />
            <YAxis type="number" tickCount={14} domain={[7, 'auto']} />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="averageIntensity" stroke="#6BB8ED" name="Average Intensity" fill="url(#colorUv)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AreaChartComponent