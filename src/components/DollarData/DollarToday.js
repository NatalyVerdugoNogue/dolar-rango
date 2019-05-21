import React, { Component } from 'react';

class DollarToday extends Component {

  constructor() {
    super();

    // obtención de fecha actual
    this.today = new Date()
    this.dateToday = this.today.getDate();
    this.monthToday = this.today.getMonth();
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
    const url_today = `https://api.sbif.cl/api-sbifv3/recursos_api/dolar/${this.yearToday}/${this.monthToday}/dias/${this.dateToday}?apikey=9c84db4d447c80c74961a72245371245cb7ac15f&formato=json`
    const responseDollarToday = await fetch(url_today);
    const dollarToday = await responseDollarToday.json();
    try {
      this.setState({ Valor: dollarToday.Dolares[0].Valor })
    }
    catch{
      this.setState({ Valor: 'sin valor disponible' })
    };
  };

  render() {
    const { Valor, Fecha } = this.state
    return (
      <div>
        <span>
          {Fecha}
        </span>
        <span>
          {Valor}
        </span>
      </div>
    );
  };

}

export default DollarToday;