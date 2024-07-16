import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import { chartData } from '../assets/datas';

const Chart = () => {
  return (
    <ResponsiveContainer width={'100%'} height={300}>
      <BarChart width={150} height={40} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="5 5" />
        <Bar dataKey="total" fill="#8884d8" barSize={80} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
