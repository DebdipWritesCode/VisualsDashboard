import React from 'react';
import { CartesianGrid, Legend, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";

const ScatterPlotComponent = ({ graphData = [] }) => {

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

  const dataRelevance = graphData.map((item) => {
    return {
      x: item.intensity,
      y: item.relevance,
    }
  })

  const dataLikelihood = graphData.map((item) => {
    return {
      x: item.intensity,
      y: item.likelihood,
    }
  })

  return (
    <div className="w-full flex flex-col text-center">
      <div className="p-3">
        <h3 className="text-base font-bold text-purple-700">Intensity in Comparison to Likelihood and Relevance</h3>
      </div>
      <div className="h-full">
        <ResponsiveContainer width="95%" className=' aspect-auto'>
          <ScatterChart margin={{ top: 30, right: 30, left: -20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="x" name="Intensity" />
            <YAxis type="number" dataKey="y" name='Value' />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="Intensity vs Relevance" data={dataRelevance} fill="#1E90FF" shape="circle" />
            <Scatter name="Intensity vs Likelihood" data={dataLikelihood} fill="#DC143C" shape="circle" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ScatterPlotComponent;
