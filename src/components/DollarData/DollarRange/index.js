import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';

import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

import ValueRange from './ValueRange'
import DollarGraph from './DollarGraph';
import DateValue from './DateValue'


class DollarRange extends Component {

  constructor() {
    super();

    this.options = {
      format: 'dd/mm/yyyy',
      maxDate: new Date(),
      firstDay: 1,
      i18n: {
        cancel: 'Cancelar',
        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
        weekdays: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        weekdaysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
        weekdaysAbbrev: ["D", "L", "M", "M", "J", "V", "S"]
      }
    }

    this.state = {
      starDate: null,
      endDate: null,
      average: null,
      maxValue: null,
      minValue: null,
      dataGraph: [],
      optionsStart: {...this.options},
      optionsEnd: {...this.options, minDate: null},
      minDate:null
    }
  }


  // fetch a sbif dollar de rango de dias
  async getDollarRange() {
    const url_range = `https://api.sbif.cl/api-sbifv3/recursos_api/dolar/periodo/${this.state.starDate.getFullYear()}/${this.state.starDate.getMonth()}/dias_i/${this.state.starDate.getDate()}/${this.state.endDate.getFullYear()}/${this.state.endDate.getMonth()}/dias_f/${this.state.endDate.getDate()}?apikey=9c84db4d447c80c74961a72245371245cb7ac15f&formato=json`

    const responseDollarRange = await fetch(url_range);
    const dollarRange = await responseDollarRange.json();

    const dollarValues = (dollarRange.Dolares).map(elem => parseFloat(elem.Valor.replace(',', '.')));
    this.getAverageValue(dollarValues);
    this.getMaxMinValue(dollarValues);
    this.changeValueToData(dollarRange.Dolares);
  };

  // obtengo valore promedio
  getAverageValue = (Dolares) => {
    const amount = Dolares.length;
    const sumValues = Dolares.reduce((a, b) => { return a + b });
    const average = (sumValues / amount).toFixed(2)
    this.setState({ average })
  }

  // obtengo valor maximo y minimo
  getMaxMinValue = (Dolares) => {
    const maxValue = Math.max(...Dolares);
    const minValue = Math.min(...Dolares);
    this.setState({ maxValue });
    this.setState({ minValue })
  }

  changeValueToData = (Dolares) => {
    var options = { year: '2-digit', month: '2-digit', day: '2-digit' };
    const dataGraph = Dolares.map(elem => { return { 'Valor': (parseFloat(elem.Valor.replace(',', '.'))), 'Fecha': (new Date(elem.Fecha.replace(/-/g, ','))).toLocaleDateString('es-CL', options) } })
    this.setState({ dataGraph })
  }



  render() {
    const { average, maxValue, minValue, dataGraph, optionsStart, optionsEnd } = this.state;
    return (
      <Row>
        <Col l={6}>
          <DateValue 
          title={"Fecha inicio:"} 
          options={optionsStart} 
          onChange={(value => {
            console.log('value:', value);
            this.setState({optionsEnd: {...optionsEnd, minDate: value}});
            this.setState({minDate: value});
          })}>
          </DateValue>
        </Col>
        <Col l={6}>
          <DateValue 
          title={"Fecha termino:"} 
          options={this.state.optionsEnd}
          minDate={this.state.minDate}>
          </DateValue>
        </Col>
        {/* <Col l={6}>
          <DatePicker
            placeholder="Fecha inicio:"
            options={this.options}
            onChange={(starDate) => {
              this.setState({ starDate });
              this.options.minDate = this.state.starDate;
              if (this.state.starDate && this.state.endDate) {
                this.getDollarRange()
              }
            }}
          />
        </Col>

        <Col l={6}>
          <DatePicker
            placeholder="Fecha termino:"
            options={this.options}
            onChange={(endDate) => {
              this.setState({ endDate });
              if (this.state.starDate && this.state.endDate) {
                this.getDollarRange()
              }
            }}
          />
        </Col> */}
        <Col l={8} margin-left='auto'>
          <ValueRange average={average} maxValue={maxValue} minValue={minValue}></ValueRange>
        </Col>

        <Col l={8} margin-left='auto'>
          <DollarGraph dataGraph={dataGraph} ></DollarGraph>
        </Col>
      </Row>
    )
  }
}


export default DollarRange