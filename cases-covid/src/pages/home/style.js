import styled from "styled-components"

export const DivInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10% 0;
`

export const DateDados = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

export const Paragrafo = styled.p`
  width: 100%;
  height: 50px;
  padding: 1% 0.5%;
  font-size: 10px;
  overflow: hidden;
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