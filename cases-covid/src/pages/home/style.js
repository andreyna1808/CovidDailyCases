import styled from "styled-components"

export const DivInput = styled.div`
  width: 90%;
  margin-left: 5%;
  justify-content: center;
  display: flex;
  flex-direction: column;
`

export const DateDados = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const Paragrafo = styled.p`
  padding: 2% 0;
  font-size: 18px;
  overflow: hidden;
  @media (max-width: 700px) {
    font-size: 12px;
    padding: 2%;
	}
`
export const ButtonComeBack = styled.button`
	position: absolute;
	top: 0;
	left: 45%;
	margin: 0.4% 0;
	color: white;
	font-weight: bolder;
	background-color: transparent;
	border: none;
	cursor: pointer;
	width: 180px;
	height: 25px;
	:hover {
		transition: 0.5s;
		font-size: 16px;
	}
`;

export const Selects = styled.select`
    margin: 2% 0;
    background-color: #ffffff;
    border: none;
    padding: 12px 22px;
    font-size: 16px;
    border-radius: 10px;
    color: #212165;
    font-weight: 900;
    width: 60%;
	`
	
export const Options = styled.option`
	font-weight: bolder;
  color: black;
`
export const Button = styled.button`
    background-color: transparent;
    padding: 10px 22px;
    font-size: 22px;
    border-radius: 25px;
    width: 250px;
    margin-left: 5%;
    color: #ffffff;
    border: #1b89ae solid 2px;
    font-weight: 900;
    &:hover{
        cursor: pointer;
        background-color:  #ffffff;
        color: #0f334c;
        transition: 0.3s;
    }
    &:disabled {
      color: black;
      background-color: transparent;
      border: black solid 2px;
    }
    @media (max-width: 700px) {
      margin: 5% auto;
	  }
`