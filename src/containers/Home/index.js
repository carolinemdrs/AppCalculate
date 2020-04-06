import React from "react";
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import ExchangeRateCard from './exchangeCard';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';



class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exchange: [],
      price: '',
      tax: '',
      paymentSelectedOption:'',
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

  onChangeInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

//valores totais com impostos BRL
  getTotalValueCashBRL = () => {
    const priceValue = Number(this.state.price)
    const localTax = Number(this.state.tax / 100 )
    const totalLocalTax = Number(localTax * priceValue)
    const priceWithLocalTax = Number(priceValue + totalLocalTax)
    const exchangeValue = Number(this.state.exchange)
    const brTax = Number(exchangeValue * 0.011)
    const totalBrTax = Number(brTax + exchangeValue)
    const totalPrice = Number(priceWithLocalTax * totalBrTax )

    return totalPrice
  }

  getTotalValueCardBRL = () => {
    const priceValue = Number(this.state.price)
    const localTax = Number(this.state.tax / 100 )
    const totalLocalTax = Number(localTax * priceValue)
    const priceWithLocalTax = Number(priceValue + totalLocalTax)
    const exchangeValue = Number(this.state.exchange)
    const brTax = Number(exchangeValue * 0.0638)
    const totalBrTax = Number(brTax + exchangeValue)
    const totalPrice = Number(priceWithLocalTax * totalBrTax )
  
    return totalPrice
  }
//valores totais com impostos USD
  getTotalValueCashUSD = () => {
    const priceValue = Number(this.state.price)
    const localTax = Number(this.state.tax / 100 )
    const totalLocalTax = Number(localTax * priceValue)
    const priceWithLocalTax = Number(priceValue + totalLocalTax)
    const exchangeValue = Number(this.state.exchange)
    const brTax = Number(exchangeValue * 0.011)
    const totalBrTax = Number(brTax + exchangeValue)
    const totalPrice = Number(priceWithLocalTax * totalBrTax )
    const totalPriceUSD = Number(totalPrice / exchangeValue )
  
    return totalPriceUSD
  }

  getTotalValueCardUSD = () => {
    const priceValue = Number(this.state.price)
    const localTax = Number(this.state.tax / 100 )
    const totalLocalTax = Number(localTax * priceValue)
    const priceWithLocalTax = Number(priceValue + totalLocalTax)
    const exchangeValue = Number(this.state.exchange)
    const brTax = Number(exchangeValue * 0.0638)
    const totalBrTax = Number(brTax + exchangeValue)
    const totalPrice = Number(priceWithLocalTax * totalBrTax)
    const totalPriceUSD = Number(totalPrice / exchangeValue)

    return totalPriceUSD
  }

  //valores totais sem impostos BRL
  getTotalValueBRLNoTax = () => {
    const priceValue = Number(this.state.price)
    const exchangeValue = Number(this.state.exchange)
    const totalPrice = Number(priceValue * exchangeValue )
    return totalPrice
  }

  getTotalValueUSDNoTax = () => {
    const priceValue = Number(this.state.price)
    return priceValue
  }

  onChangeRadioButton = (e) =>{
    this.setState({
      paymentSelectedOption: e.target.value
    });
  }

handleFormSubmit=(e)=> {
e.preventDefault();

console.log('Método de pagamento:', this.state.paymentSelectedOption);
}
    render() {
        const {exchange, price, tax} = this.state
      return (
        <div>
          <h1>Cotação do dia USD</h1>
          <ExchangeRateCard data={exchange}/>
          <TextField 
            type ='number'
            variant ="outlined"
            required
            name ='price'
            label ='Preço em dólar US$'
            value = {price}
            onChange = {this.onChangeInput}
          />
          <TextField 
            type ='number'
            variant = "outlined"
            required
            name = 'tax'
            label = 'Taxa de Estado %'
            value = {tax}
            onChange = {this.onChangeInput}
          />

          <form onSubmit={this.handleFormSubmit}>
            <FormLabel component='legend'>Método de Pagamento</FormLabel>
            <FormControlLabel 
              value='cash'  
              control={<Radio />} 
              label='Dinheiro' 
              type='radio'
              checked={this.state.paymentSelectedOption === 'cash'}
              onChange={this.onChangeRadioButton} />
            <FormControlLabel 
              value='card'  
              control={<Radio />}
              label='Cartão de crédito'
              type='radio'
              checked={this.state.paymentSelectedOption === 'card'}
              onChange={this.onChangeRadioButton} />
            
          </form>

          <div>
            <p>Taxa IOF:  {this.state.paymentSelectedOption === 'cash' ? '1.1%' : '' || this.state.paymentSelectedOption === 'card' ? '6.38%' : ''  }</p>
            <p>Valor total com Impostos BRL  {this.state.paymentSelectedOption === 'cash' ?  ('R$', this.getTotalValueCashBRL()) : '' || this.state.paymentSelectedOption === 'card' ? this.getTotalValueCardBRL() : ''}</p>
            <p>Valor total sem Impostos BRL  {this.state.paymentSelectedOption === 'cash' ?  this.getTotalValueBRLNoTax() : '' || this.state.paymentSelectedOption === 'card' ? this.getTotalValueBRLNoTax() : ''}</p>
            <p>Valor total com Impostos USD  {this.state.paymentSelectedOption === 'cash' ?  this.getTotalValueCashUSD() : '' || this.state.paymentSelectedOption === 'card' ? this.getTotalValueCardUSD() : ''}</p>
            <p>Valor total sem Impostos USD  {this.state.paymentSelectedOption === 'cash' ?  this.getTotalValueUSDNoTax() : '' || this.state.paymentSelectedOption === 'card' ? this.getTotalValueUSDNoTax() : ''}</p>
          </div>

        </div>
      );
    }
  }
  export default Home;
