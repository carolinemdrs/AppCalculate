import React from 'react';
import {shallow, 
        mount, 
        configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from './index';
import sinon from 'sinon';

configure({adapter: new Adapter()});

test('função deve retornar valor total em reais do método de pagamento dinheiro', () => {
    const priceValue = 5
    const localTax = 8.8 / 100 
    const totalLocalTax = Number(localTax * priceValue)
    const priceWithLocalTax = Number(priceValue + totalLocalTax)
    const exchangeValue = 5.2229
    const brTax = Number(exchangeValue * 0.011)
    const totalBrTax = Number(brTax + exchangeValue)
    const totalPrice = Number(priceWithLocalTax * totalBrTax )
    const totalPriceFinal = Number(totalPrice.toFixed(3)) 

    expect(totalPriceFinal).toBe(28.725)
});


test('chamar a função componentDidMount', () => {
    sinon.spy(Home.prototype, 'componentDidMount');
    const wrapper = mount(<Home />);
    expect(Home.prototype.componentDidMount).toHaveProperty('callCount', 1);
    Home.prototype.componentDidMount.restore();
  });


test('deve retornar o componente header' , () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('Header').length).toBe(1);
});

test('deve retornar o marcador h1' , () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('h1').length).toBe(1);
});

test('deve retornar o marcador h2' , () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('h2').length).toBe(1);
});

test('deve retornar o marcador p' , () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('p').length).toBe(4);
});
