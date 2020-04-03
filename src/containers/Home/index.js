import React from "react";
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import ExchangeRateCard from './exchangeCard';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exchange: [],
      price: '',
      tax: ''
    };
  }

  componentDidMount() {
    const endPoint = 'https://economia.awesomeapi.com.br/all/USD-BRL'
    axios.get(endPoint)
      .then(response => {
          this.setState({
              exchange: response.data.USD.high
          })
          console.log(this.state.exchange)
      })
      .catch(error => {
          console.log(error)
      })
  }

    render() {
        const {exchange, price, tax} = this.state
      return (
        <div>
          <h1>Cotação do dia BRL</h1>
          <ExchangeRateCard data={exchange}/>
          <TextField 
            variant="outlined"
            required
            name="price"
            type="price"
            label="Preço em dólar US$"
            value={price}
          />
          <TextField 
            variant="outlined"
            required
            name="tax"
            type="tax"
            label="Taxa de Estado %"
            value={tax}
          />
        </div>
      );
    }
  }
  export default Home;
