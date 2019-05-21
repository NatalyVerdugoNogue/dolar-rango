import React from 'react';
import { Table } from 'react-materialize';

const ValueRange = ({ average, maxValue, minValue }) => (
  <Table>
    <tbody>
      <tr>
        <td>
          Valor Promedio
          </td>
        <td>
          {average}
        </td>
      </tr>
      <tr>
        <td>
          Valor Máximo
          </td>
        <td>
          {maxValue}
        </td>
      </tr>
      <tr>
        <td>
          Valor Mínimo
          </td>
        <td>
          {minValue}
        </td>
      </tr>
    </tbody>
  </Table>)



export default ValueRange;