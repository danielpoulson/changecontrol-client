import React from 'react';
import { connect } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const RechartBarChart = (props: { barData: [] }) => (
  <BarChart width={600} height={300} data={props.barData} margin={{ top: 5, right: 50, left: 5, bottom: 5 }}>
    <XAxis dataKey="_id" />
    <YAxis />
    <CartesianGrid strokeDasharray="3 3" />
    <Tooltip />
    <Legend />
    <Bar dataKey="open" fill="#ED1B2C" />
    <Bar dataKey="closed" fill="#c4cbc7" />
  </BarChart>
);

export default connect(state => ({ barData: state.main.barData }))(RechartBarChart);
