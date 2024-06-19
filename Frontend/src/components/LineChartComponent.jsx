import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const initialData = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

const LineChartComponent = () => {
  const [data, setData] = useState(initialData);
  const [showUV, setShowUV] = useState(true);
  const [showPV, setShowPV] = useState(true);

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'uv') setShowUV(checked);
    if (name === 'pv') setShowPV(checked);
  };

  return (
    <div>
      <div>
        <label>
          <input
            type="checkbox"
            name="uv"
            checked={showUV}
            onChange={handleFilterChange}
          />
          UV
        </label>
        <label>
          <input
            type="checkbox"
            name="pv"
            checked={showPV}
            onChange={handleFilterChange}
          />
          PV
        </label>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {showUV && <Line type="monotone" dataKey="uv" stroke="#82ca9d" />}
          {showPV && <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
