import styled from 'styled-components';
import Fundo from '../constants/imgs/fundo.jpg';

export const Container = styled.div`
	background: url(${Fundo}) no-repeat center;
	min-width: 100%;
	min-height: 100vh;
	background-size: cover;
	text-align: center;
	overflow-x: hidden;
	margin: auto;
`;

export const Header = styled.header`
	height: 6vh;
  overflow: hidden;
  text-align: left;
	background-image: linear-gradient(
		35deg,
		hsl(210deg 100% 65%) 0%,
		hsl(209deg 73% 55%) 11%,
		hsl(207deg 63% 47%) 24%,
		hsl(206deg 68% 38%) 38%,
		hsl(205deg 74% 31%) 54%,
		hsl(204deg 82% 24%) 75%,
		hsl(203deg 89% 17%) 100%
	);
`;

export const Img = styled.img`
  height: 6vh;
  margin: 0 2%;
`
