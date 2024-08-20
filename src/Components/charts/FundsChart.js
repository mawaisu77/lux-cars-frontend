import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const FundsChart = ({ data, color }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <XAxis dataKey="name" hide />
        <YAxis hide />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke={color} fill={color} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default FundsChart;
