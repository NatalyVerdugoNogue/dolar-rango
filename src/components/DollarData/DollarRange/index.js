import React, { Component } from 'react';
import { Row, Col, DatePicker } from 'react-materialize';

import * as env from '../../../environment';

import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

import ValueRange from './ValueRange'
import DollarGraph from './DollarGraph';


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
    };

    this.state = {
      starDate: null,
      endDate: null,
      average: null,
      maxValue: null,
      minValue: null,
      dataGraph: []
    };
  };


  // fetch a sbif dollar de rango de dias
  async getDollarRange() {

    const { starDate, endDate } = this.state;

    if (endDate >= starDate) {
      const { API_KEY } = env[process.env.NODE_ENV];
      const url_range = `https://api.sbif.cl/api-sbifv3/recursos_api/dolar/periodo/${starDate.getFullYear()}/${starDate.getMonth() + 1}/dias_i/${starDate.getDate()}/${endDate.getFullYear()}/${endDate.getMonth() + 1}/dias_f/${endDate.getDate()}?apikey=${API_KEY}&formato=json`;

      try {
        const responseDollarRange = await fetch(url_range);
        const dollarRange = await responseDollarRange.json();

        const dollarValues = (dollarRange.Dolares).map(elem => parseFloat(elem.Valor.replace(',', '.')));
        this.getAverageValue(dollarValues);
        this.getMaxMinValue(dollarValues);
        this.changeValueToData(dollarRange.Dolares);
      }
      catch{
        this.setState({ average: 'sin valor disponible', maxValue: 'sin valor disponible', minValue: 'sin valor disponible' })
        alert(('Falla en obtención de datos'))
      }

    } else {
      alert(('La fecha de termino debe ser menor a la de inicio'))
    }
  };

  // obtengo valor promedio
  getAverageValue = (Dolares) => {
    const amount = Dolares.length;
    const sumValues = Dolares.reduce((a, b) => { return a + b });
    const average = (sumValues / amount).toFixed(2);
    this.setState({ average });
  };

  // obtengo valor maximo y minimo
  getMaxMinValue = (Dolares) => {
    const maxValue = Math.max(...Dolares);
    const minValue = Math.min(...Dolares);
    this.setState({ maxValue });
    this.setState({ minValue });
  };

  // cambio formato del objeto para darlo a los graficos
  changeValueToData = (Dolares) => {
    var options = { year: '2-digit', month: '2-digit', day: '2-digit' };
    const dataGraph = Dolares.map(elem => { return { 'Valor': (parseFloat(elem.Valor.replace(',', '.'))), 'Fecha': (new Date(elem.Fecha.replace(/-/g, ','))).toLocaleDateString('es-CL', options) } });
    this.setState({ dataGraph });
  };


  render() {
    const { average, maxValue, minValue, dataGraph } = this.state;

    return (
      <Row>

        <Col m={12} s={12} className='dollarRangeInt'>
          <Row className='dollarRangeRow'>
            <Col m={4} offset={'m2'} s={6}>
              <DatePicker
                className='dollarRangeColor'
                placeholder="Fecha inicio:"
                options={this.options}
                onChange={(starDate) => {
                  this.setState({ starDate });
                  if (this.state.starDate && this.state.endDate) {
                    this.getDollarRange()
                  }
                }}
              />
            </Col>

            <Col m={4} offset={'m2'} s={6}>
              <DatePicker
                className='dollarRangeColor'
                placeholder="Fecha termino:"
                options={this.options}
                onChange={(endDate) => {
                  this.setState({ endDate });
                  if (this.state.starDate && this.state.endDate) {
                    this.getDollarRange()
                  };
                }}
              />
            </Col>
          </Row>
        </Col>

        <Col m={4} offset={'m1'} s={12} className='valueRangeInt'>
          <ValueRange average={average} maxValue={maxValue} minValue={minValue}></ValueRange>
        </Col>

        <Col m={5} offset={'m1'} s={12} className='dollarGraphInt'>
          <DollarGraph dataGraph={dataGraph} ></DollarGraph>
        </Col>
      </Row>
    );
  };
};


export default DollarRange;