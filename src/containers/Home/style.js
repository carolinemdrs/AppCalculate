import styled from "styled-components";

export const MainContainerStyled = styled.div`
  display:flex;
  flex-direction:column;
  padding:4vh;
  height:100vh;

  @media (max-width: 1440px) and (min-width:768px)   {
    align-items:center;
    padding-right:50vh;
    padding-left:50vh;
    display:flex;
  }
`;

export const ImgStyled = styled.img`
  width:20%;
  margin-right:3vh;

  @media (max-width: 1440px) and (min-width:768px)   {
    width:10%;
  }
`;

export const InputsStyled = styled.div`
  width: 100%;
  display:grid;
  gap:8px; 
`;

export const PaymentStyled = styled.div`
  display: flex;
  align-items: center;
`;

export const FormStyled = styled.div`
 @media (max-width: 1440px) and (min-width:768px)   {
    background-color: #F5F5F5;
    margin-top:15px;
    width:105vh;
    padding-left:30vh;
  }
`;

export const TotalValuesStyled = styled.div`
  font-size:20px;
  font-style: Marker Felt, fantasy;

  @media (max-width: 1440px) and (min-width:768px)   {
    width:105vh;
    background-color: #F5F5F5;
    padding-left:30vh;
    }
`;

export const TotalStyled = styled.div`
  display: flex;
  align-items: center;
`;