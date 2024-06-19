import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts"

const RadarChartComponent = ({ graphData = [] }) => {

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
        <h3 className=" text-base font-bold text-purple-700">Average intensity, likelihood and relevance in different topics</h3>
      </div>
      <div className='h-full'>
        <ResponsiveContainer width="95%" className=' aspect-auto'>
          <RadarChart data={graphData} margin={{ top: 30, right: -20, left: 10, bottom: 10 }}>
            <PolarGrid />
            <PolarAngleAxis />
            <PolarRadiusAxis />
            <Radar dataKey="averageLikelihood" name="Likelihood" stroke="#451236" fill="#451236" fillOpacity={0.8} />
            <Radar dataKey="averageRelevance" name="Relevance" stroke="#4D7EA8" fill="#4D7EA8" fillOpacity={0.6} />
            <Radar dataKey="averageIntensity" name="Intensity" stroke="#E8C547" fill="#E8C547" fillOpacity={0.5} />
            <Legend />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default RadarChartComponent