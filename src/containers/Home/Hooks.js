import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {MainContainerStyled, 
        ImgStyled, 
        TotalValuesStyled, 
        InputsStyled, 
        PaymentStyled,
        TotalStyled,
        FormStyled} from './style';
import cash from '../../img/cash.png';
import card from '../../img/card.png';
import brasil from '../../img/brasil.svg';
import eua from '../../img/eua.svg';
import Header from '../../components/header';

function HomeHooks () {
   const [exchange, setExchange] = useState ([]);
   const [price, setPrice] = useState ('');
   const [tax, setTax] = useState('');
   const [paymentOption, setpaymentOption] = useState('');

    useEffect (() => {
    const endPoint = 'https://economia.awesomeapi.com.br/all/USD-BRL'
        axios.get(endPoint)
        .then(exchange => setExchange(exchange.data.USD.high)
        )}
    )

    const onChangePrice = (e) =>{
        setPrice(e.target.value)
    }
    const onChangeTax = (e) =>{
        setTax(e.target.value)
    }
    const onChangeRadioButton = (e) =>{
        setpaymentOption(e.target.value)
    }

//cálculo de valores totais com impostos BRL
const getTotalValueCashBRL = () => {
    const priceValue = Number(price)
    const localTax = Number(tax / 100 )
    const totalLocalTax = Number(localTax * priceValue)
    const priceWithLocalTax = Number(priceValue + totalLocalTax)
    const exchangeValue = Number(exchange)
    const brTax = Number(exchangeValue * 0.011)
    const totalBrTax = Number(brTax + exchangeValue)
    const totalPrice = Number(priceWithLocalTax * totalBrTax )

    return totalPrice.toFixed(3)
  }

  const getTotalValueCardBRL = () => {
    const priceValue = Number(price)
    const localTax = Number(tax / 100 )
    const totalLocalTax = Number(localTax * priceValue)
    const priceWithLocalTax = Number(priceValue + totalLocalTax)
    const exchangeValue = Number(exchange)
    const brTax = Number(exchangeValue * 0.0638)
    const totalBrTax = Number(brTax + exchangeValue)
    const totalPrice = Number(priceWithLocalTax * totalBrTax )
  
    return totalPrice.toFixed(3)
  }

//cálculo de valores totais com impostos USD
const getTotalValueCashUSD = () => {
    const priceValue = Number(price)
    const localTax = Number(tax / 100 )
    const totalLocalTax = Number(localTax * priceValue)
    const priceWithLocalTax = Number(priceValue + totalLocalTax)
    const exchangeValue = Number(exchange)
    const brTax = Number(exchangeValue * 0.011)
    const totalBrTax = Number(brTax + exchangeValue)
    const totalPrice = Number(priceWithLocalTax * totalBrTax )
    const totalPriceUSD = Number(totalPrice / exchangeValue )
  
    return totalPriceUSD.toFixed(3)
  }

  const getTotalValueCardUSD = () => {
    const priceValue = Number(price)
    const localTax = Number(tax / 100 )
    const totalLocalTax = Number(localTax * priceValue)
    const priceWithLocalTax = Number(priceValue + totalLocalTax)
    const exchangeValue = Number(exchange)
    const brTax = Number(exchangeValue * 0.0638)
    const totalBrTax = Number(brTax + exchangeValue)
    const totalPrice = Number(priceWithLocalTax * totalBrTax)
    const totalPriceUSD = Number(totalPrice / exchangeValue)

    return totalPriceUSD.toFixed(3)
  }

  //cálculo de  valores totais sem impostos 
  const getTotalValueBRLNoTax = () => {
    const priceValue = Number(price)
    const exchangeValue = Number(exchange)
    const totalPrice = Number(priceValue * exchangeValue )
    return totalPrice.toFixed(3)
  }

  //definição de quais valores serão mostrados na tela( de acordo com método de pagamento)
  const showTotalValueBRL = () => {
    if (paymentOption === 'cash') {
      return  getTotalValueCashBRL()
    }
    else if (paymentOption === 'card') {
      return getTotalValueCardBRL()
    }
    else {
     return ''
    } 
}

const showTotalValueUSD = () => {
  if (paymentOption === 'cash') {
    return  getTotalValueCashUSD()
  }
  else if (paymentOption === 'card') {
    return getTotalValueCardUSD()
  }
  else {
   return ''
  } 
}

const showTotalValueNoTaxBRL = () => {
  if (paymentOption === 'cash') {
    return  getTotalValueBRLNoTax()
  }
  else if (paymentOption === 'card') {
    return getTotalValueBRLNoTax()
  }
  else {
   return ''
  } 
}

const showTotalValueUSDNoTax = () => {
  const priceValue = Number(price)

  if (paymentOption === 'cash') {
    return  priceValue.toFixed(3)
  }
  else if (paymentOption === 'card') {
    return priceValue.toFixed(3) 
  }
  else {
   return ''
  } 

}

    return (
        <div>
            <Header />
            <MainContainerStyled>
                <div>
                <h1>Cotação do dia (USD) : </h1>
                <h2>R$ {exchange}</h2>               
                </div>

                <InputsStyled>
                <TextField 
                    type ='number'
                    variant ="outlined"
                    required
                    name ='price'
                    label ='Preço em dólar US$'
                    value = {price}
                    onChange = {onChangePrice}
                />
                <TextField 
                    type ='number'
                    variant = "outlined"
                    required
                    name = 'tax'
                    label = 'Taxa de Estado %'
                    value = {tax}
                    onChange = {onChangeTax}
                />
                </InputsStyled>

                <FormStyled >
                <h2>Método de Pagamento</h2>
                <PaymentStyled>
                    <ImgStyled src = {cash} alt="dinheiro" />
                    <FormControlLabel
                    value = 'cash'  
                    control = {<Radio />} 
                    label = 'Dinheiro' 
                    type = 'radio'
                    checked = {paymentOption === 'cash'}
                    onChange = {onChangeRadioButton} />
                </PaymentStyled>

                <PaymentStyled>
                    <ImgStyled src = {card} alt="cartão de crédito" />
                    <FormControlLabel 
                    value = 'card'  
                    control = {<Radio />}
                    label = 'Cartão de crédito'
                    type = 'radio'
                    checked = {paymentOption === 'card'}
                    onChange = {onChangeRadioButton} />
                </PaymentStyled>
                </FormStyled>
               
                <TotalValuesStyled>
                    <p>Taxa IOF:  {paymentOption === 'cash' ? '1.1%' : '' || paymentOption === 'card' ? '6.38%' : '' }</p>
                    <TotalStyled>
                        <ImgStyled src = {brasil} alt="bandeira do Brasil" /> Valores em Real:
                    </TotalStyled>
                    <p>Valor total com Impostos BRL: <b>{showTotalValueBRL()}</b>  </p>
                    <p>Valor total sem Impostos BRL: <b>{showTotalValueNoTaxBRL()}</b> </p>
                    <TotalStyled>
                        <ImgStyled src = {eua} alt="bandeira dos Estados Unidos" /> Valores em Dolar: 
                    </TotalStyled>
                    <p>Valor total com Impostos USD: <b>{showTotalValueUSD()}</b>  </p>
                    <p>Valor total sem Impostos USD: <b>{showTotalValueUSDNoTax()}</b> </p>
                </TotalValuesStyled>
          </MainContainerStyled>
        </div>
    )
}
export default HomeHooks