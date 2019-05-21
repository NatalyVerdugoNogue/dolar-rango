import React from 'react';
import { Table } from 'react-materialize';

const ValueRange = ({ average, maxValue, minValue }) => (
  <Table className="valueRangeCon">
    <tbody>
      <tr>
        <td className="tdValue">
          Valor Promedio
          </td>
        <td>
          {average}
        </td>
      </tr>
      <tr>
        <td className="tdValue">
          Valor Máximo
          </td>
        <td>
          {maxValue}
        </td>
      </tr>
      <tr>
        <td className="tdValue">
          Valor Mínimo
          </td>
        <td>
          {minValue}
        </td>
      </tr>
    </tbody>
  </Table>
);



export default ValueRange;