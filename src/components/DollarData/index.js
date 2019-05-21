import React from 'react';
import { Row, Col } from 'react-materialize';

import DollarToday from './DollarToday'
import DollarRange from './DollarRange'

import logo from '../../img/logo.png'



const DollarData = () => (

  <Row>
    <Col m={12} s={12} className="titleCon">
      <img src={logo} alt='logo' className="imgLogo" />
    </Col>
    <Col m={12} s={12} className="dollarTodayInt">
      <DollarToday></DollarToday>
    </Col>
    <Col m={12} s={12} >
      <DollarRange></DollarRange>
    </Col>
  </Row>

);


export default DollarData;


