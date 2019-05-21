import React, { Component } from 'react';
import { Col, Table } from 'react-materialize';

import * as env from '../../environment'

class DollarToday extends Component {

  constructor() {
    super();

    // obtención de fecha actual
    this.today = new Date()
    this.dateToday = this.today.getDate();
    this.monthToday = this.today.getMonth() + 1;
    this.yearToday = this.today.getFullYear();
    this.dayToday = this.today.getDay();

    // Cambio a viernes si es domingo o sabado
    if (this.dayToday === 0) {
      this.dateToday = this.dateToday - 2
    };
    if (this.dayToday === 6) {
      this.dateToday = this.dateToday - 1
    };

    this.state = {
      Valor: null,
      Fecha: this.today.toLocaleDateString('es-CL')
    };
  };

  componentDidMount() {
    this.getDollarToday();
  };

  // fetch a sbif dollar de día especifico
  async getDollarToday() {
    const { API_KEY } = env[process.env.NODE_ENV];
    const url_today = `https://api.sbif.cl/api-sbifv3/recursos_api/dolar/${this.yearToday}/${this.monthToday}/dias/${this.dateToday}?apikey=${API_KEY}&formato=json`

    try {
      const responseDollarToday = await fetch(url_today);
      const dollarToday = await responseDollarToday.json();
      this.setState({ Valor: dollarToday.Dolares[0].Valor })
    }
    catch{
      this.setState({ Valor: 'sin valor disponible' })
    };
  };

  render() {
    const { Valor, Fecha } = this.state
    return (
      <Col m={4} offset={'m4'} s={12} >
        <Table centered>
          <tbody>
            <tr>
              <td>
                {Fecha}
              </td>
              <td>
                {Number(Valor) ? `$ ${Valor}` : Valor}
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
    );
  };

}

export default DollarToday;