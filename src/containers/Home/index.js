import React from "react";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import ExchangeRateCard from './exchangeCard';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {MainContainerStyled, ImgStyled, TotalValuesStyled, InputsStyled, PaymentStyled,TotalStyled,FormStyled} from './style';
import brasil from '../../img/brasil.svg';
import eua from '../../img/eua.svg';
import cash from '../../img/cash.png';
import card from '../../img/card.png';
import Header from '../../components/header';

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

  onChangeRadioButton = (e) =>{
    this.setState({
      paymentSelectedOption: e.target.value
    });
  }

  handleFormSubmit=(e)=> {
  e.preventDefault();
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

    return totalPrice.toFixed(3)
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
  
    return totalPrice.toFixed(3)
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
  
    return totalPriceUSD.toFixed(3)
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

    return totalPriceUSD.toFixed(3)
  }

  //valores totais sem impostos 
  getTotalValueBRLNoTax = () => {
    const priceValue = Number(this.state.price)
    const exchangeValue = Number(this.state.exchange)
    const totalPrice = Number(priceValue * exchangeValue )
    return totalPrice.toFixed(3)
  }

  getTotalValueUSDNoTax = () => {
    const priceValue = Number(this.state.price)
    return priceValue
  }


    render() {
        const {exchange, price, tax} = this.state
        
      return (
        <div>
          <Header />
          <MainContainerStyled>
            <div>
              <h1>Cotação do dia (USD) :</h1>
              <ExchangeRateCard data={exchange}/>
            </div>
            <InputsStyled>
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
            </InputsStyled>

            <FormStyled onSubmit={this.handleFormSubmit}>
              <h2>Método de Pagamento</h2>
              <PaymentStyled>
                <ImgStyled src = {cash} />
                <FormControlLabel 
                  value='cash'  
                  control={<Radio />} 
                  label='Dinheiro' 
                  type='radio'
                  checked={this.state.paymentSelectedOption === 'cash'}
                  onChange={this.onChangeRadioButton} />
              </PaymentStyled>
              <PaymentStyled>
                <ImgStyled src = {card} />
                <FormControlLabel 
                  value='card'  
                  control={<Radio />}
                  label='Cartão de crédito'
                  type='radio'
                  checked={this.state.paymentSelectedOption === 'card'}
                  onChange={this.onChangeRadioButton} />
              </PaymentStyled>
            </FormStyled>
            <TotalValuesStyled>
              <p>Taxa IOF:  {this.state.paymentSelectedOption === 'cash' ? '1.1%' : '' || this.state.paymentSelectedOption === 'card' ? '6.38%' : ''  }</p>
              <TotalStyled><ImgStyled src = {brasil} /> Valores em Real:</TotalStyled>
              <p>Valor total com Impostos BRL:  {this.state.paymentSelectedOption === 'cash' ?  this.getTotalValueCashBRL() : '' || this.state.paymentSelectedOption === 'card' ? this.getTotalValueCardBRL() : ''}</p>
              <p>Valor total sem Impostos BRL:  {this.state.paymentSelectedOption === 'cash' ?  this.getTotalValueBRLNoTax() : '' || this.state.paymentSelectedOption === 'card' ? this.getTotalValueBRLNoTax() : ''}</p>
              <TotalStyled><ImgStyled src = {eua} /> Valores em Dolar: </TotalStyled>
              <p>Valor total com Impostos USD:  {this.state.paymentSelectedOption === 'cash' ?  this.getTotalValueCashUSD() : '' || this.state.paymentSelectedOption === 'card' ? this.getTotalValueCardUSD() : ''}</p>
              <p>Valor total sem Impostos USD:  {this.state.paymentSelectedOption === 'cash' ?  this.getTotalValueUSDNoTax() : '' || this.state.paymentSelectedOption === 'card' ? this.getTotalValueUSDNoTax() : ''}</p>
            </TotalValuesStyled>
          </MainContainerStyled>
        </div>
      );
    }
  }
  export default Home;
