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
          {Number(average) ? `$ ${average}` : average}
        </td>
      </tr>
      <tr>
        <td className="tdValue">
          Valor Máximo
          </td>
        <td>
          {Number(maxValue) ? `$ ${maxValue}` : maxValue}
        </td>
      </tr>
      <tr>
        <td className="tdValue">
          Valor Mínimo
          </td>
        <td>
          {Number(minValue) ? `$ ${minValue}` : minValue}
        </td>
      </tr>
    </tbody>
  </Table>
);



export default ValueRange;