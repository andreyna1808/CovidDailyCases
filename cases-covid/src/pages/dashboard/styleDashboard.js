import styled from "styled-components";

export const H1 = styled.h1`
    color: white;
    width: 40%;
    font-weight: bolder;
    padding: 40px;
    font-size: 62px;
    text-shadow: 1px 1px 1px white;
    opacity: 0.9;
    @media (max-width: 700px) {
      width: 90%;
      font-size: 52px;
      padding: 30px;
	  }
`

export const Span = styled.span`
  color: black;
`
export const Paragrafo = styled.p`
    color: white;
    font-size: 25px;
    width: 40%;
    @media (max-width: 700px) {
      width: 80%;
      margin: 3% auto;
	  }
`
export const Button = styled.button`
    background-color: transparent;
    padding: 15px 32px;
    font-size: 22px;
    border-radius: 25px;
    width: 250px;
    margin-left: 20%;
    color: #ffffff;
    border: #1b89ae solid 2px;
    cursor: pointer;
    font-weight: 900;
    &:hover{
        background-color:  #ffffff;
        color: #0f334c;
        transition: 0.3s;
    }
    @media (max-width: 700px) {
      margin: 5% auto;
	  }
`

export const DivContain = styled.div`
  margin-bottom: 10%;
`