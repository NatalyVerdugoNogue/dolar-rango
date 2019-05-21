import React from 'react';
import { Row, Col } from 'react-materialize';

import DollarToday from './DollarToday'
import DollarRange from './DollarRange'

import dollar from '../../img/dollar.png'


const DollarData = () => (
  <Row>
    <Col l={12}>
      <img src={dollar} alt='dolar' width="50" />
    </Col>

    <DollarToday></DollarToday>

    <DollarRange></DollarRange>
  </Row>
);


export default DollarData;


