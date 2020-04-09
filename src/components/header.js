import React from 'react';
import dolar from '../img/dolar.svg';
import styled from 'styled-components';

export const Logo = styled.img`
    width:20%;
    margin:6px;
    background-color: #81c784;
    margin-right:4%;

    @media (max-width: 1440px) and (min-width:768px) {
        height:100px;
        width:15%;
        padding:0.5%;
        margin-right:2%;
      }
`;
export const Main = styled.div`
    background-color: #81c784;
    color:#FFF;
    font-weight:bold;
    display: flex;
    align-items: center;
    font-size:18px;

    @media (max-width: 1440px) and (min-width:768px)   {
        height:100px;
        font-size:25px;
      }
`;

const Header = () => {
    return(
        <Main>
            <Logo src={dolar} alt="logo" />
            <h2>My Stone App</h2>
        </Main>
    )   
}

export default Header; 