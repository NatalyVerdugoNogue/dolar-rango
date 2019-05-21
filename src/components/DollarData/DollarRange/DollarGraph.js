import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';



const DollarGraph = ({ dataGraph }) => {

  class CustomizedLabel extends PureComponent {
    render() {
      const {
        x, y, stroke, value,
      } = this.props;

      return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>;
    }
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          className="dollarGraphCon"

          data={dataGraph}
          margin={{
            top: 30, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Fecha" />
          <YAxis dataKey="Valor" domain={['auto', 'auto']} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Valor" stroke="#8884d8" label={dataGraph.length <= 10 ? <CustomizedLabel /> : null} name="Dolar" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DollarGraph;

