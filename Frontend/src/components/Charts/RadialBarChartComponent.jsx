import { LabelList, Legend, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip } from "recharts";

const RadialBarChartComponent = ({ graphData = [] }) => {

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

  const graphDataWithFill = graphData.map((dataPoint, index) => {
    let fillColor;
    switch (index % 20) {
      case 0:
        fillColor = "#2196F3"; // Blue
        break;
      case 1:
        fillColor = "#4CAF50"; // Green
        break;
      case 2:
        fillColor = "#FFC107"; // Yellow
        break;
      case 3:
        fillColor = "#9C27B0"; // Purple
        break;
      case 4:
        fillColor = "#FF5722"; // Orange
        break;
      case 5:
        fillColor = "#E91E63"; // Pink
        break;
      case 6:
        fillColor = "#673AB7"; // Deep Purple
        break;
      case 7:
        fillColor = "#03A9F4"; // Light Blue
        break;
      case 8:
        fillColor = "#8BC34A"; // Light Green
        break;
      case 9:
        fillColor = "#FF9800"; // Amber
        break;
      case 10:
        fillColor = "#FFEB3B"; // Yellow
        break;
      case 11:
        fillColor = "#607D8B"; // Blue Grey
        break;
      case 12:
        fillColor = "#00BCD4"; // Cyan
        break;
      case 13:
        fillColor = "#9E9E9E"; // Grey
        break;
      case 14:
        fillColor = "#CDDC39"; // Lime
        break;
      case 15:
        fillColor = "#FF5252"; // Red
        break;
      case 16:
        fillColor = "#FF9800"; // Orange
        break;
      case 17:
        fillColor = "#795548"; // Brown
        break;
      case 18:
        fillColor = "#9C27B0"; // Purple
        break;
      case 19:
        fillColor = "#00BCD4"; // Cyan
        break;
      default:
        fillColor = "#000000"; // Black
    }
    return {
      name: dataPoint._id,
      relevance_intensity: dataPoint.relevance_intensity,
      fill: fillColor
    }
  })

  return (
    <div className="w-full flex flex-col text-center">
      <div className="p-3">
        <h3 className="text-base font-bold text-purple-700">Median of intensity in different countries</h3>
      </div>
      <div className='h-full'>
        <ResponsiveContainer width="95%" className=' aspect-auto'>
          <RadialBarChart innerRadius="10%" outerRadius="80%" data={graphDataWithFill} margin={{ top: -80, right: 0, left: 20, bottom: 10 }}>
            <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} dataKey="relevance_intensity" fill="#1E90FF">
              <LabelList dataKey="name" position="insideEnd" fill="#fff" />
            </RadialBar>
            <Legend />
            <Tooltip />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default RadialBarChartComponent;
