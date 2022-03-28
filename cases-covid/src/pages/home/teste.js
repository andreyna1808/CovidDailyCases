/* import React, { memo, useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Graticule, Sphere } from 'react-simple-maps';
import axios from 'axios';
import { Apikey, BASE_URL } from '../../constants/urls';
import { DateDados, DivInput, Options, Paragrafo, Selects } from './style';
const _ = require("lodash"); 

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

function HomeFeatures({ setTooltipContent }) {
	const [ infoCase, setInfoCases ] = useState([]);
  const [ nameVariant, setNameVariant ] = useState('Alpha')
  const [ date, setDate ] = useState([])
  const [ dateSelect, setDateSelect] = useState('2020-05-11')
  const [ dateValue, setDateValue ] = useState(0)
  const [ newStyled, setNewStyled ] = useState()

  const onChange = (e) => {
    setNameVariant(e.target.value)
  }
  function dateSlectValue(value) {
    setDateValue(value)
    setDateSelect(date[value - 1])
  }

	const getInfoCountry = () => {
		axios.get(`${BASE_URL}`, Apikey).then((res) => {
			setInfoCases(res.data);
      dateCorrect();
      onNewStyled();
		})
    .catch((err) => {
      console.log(err.response);
    })
	};

	function getTotalCases(coutryName) {
		const covidDataTemp = infoCase.filter((coutry) => coutry.location.slice(0,13) === coutryName);
    const infoMore = covidDataTemp.filter((info) => info.date === dateSelect && info.variant === nameVariant)
    return infoMore.reduce((previousValue, currentValue) => previousValue + currentValue.num_sequences_total, 0)
	}
  const onEnter = (dados) => {
    let data = [];
    const totalCases = getTotalCases(dados)
    infoCase.forEach((info) => {
      if (info.location === dados) {
        data = info;
      }
    })
    setTooltipContent(`
    Country: ${dados} |
    Date: ${dateSelect} |
    Variant: ${nameVariant} |
    Cases total: ${totalCases}
      `);
  };
  const onLeave = () => {
    setTooltipContent("");
  };

  const dateCorrect = () => {
    const filterRepetidos = infoCase.map((res) => res.date)
    const filtrados = _.uniq(filterRepetidos)
    setDate(filtrados)
  }
  const onNewStyled = () => {
    const resultadoColor = infoCase.map((dados) => {
      if(dados.num_sequences_total <= 200){
        setNewStyled({
          default: {
            fill: "#yellow",
            stroke: "black",
            outline: "none",
          },
          hover: {
            fill: "#1B89AE",
            outline: "none"
          }
        })
      }
      else if(dados.num_sequences_total >= 200 && dados.num_sequences_total <= 1000){
        setNewStyled({
          default: {
            fill: "#oranged",
            stroke: "black",
            outline: "none",
          },
          hover: {
            fill: "#1B89AE",
            outline: "none"
          }
        })
      }
      else if(dados.num_sequences_total > 1000){
        setNewStyled({
          default: {
            fill: "#red",
            stroke: "black",
            outline: "none",
          },
          hover: {
            fill: "#1B89AE",
            outline: "none"
          }
        })
      }
    })
    return resultadoColor
  }

	useEffect(() => {
			getInfoCountry();
	}, [infoCase, date, newStyled]);


	return (
    <>
      <Selects onChange={onChange}>
        <Options value={nameVariant}>Alpha</Options>
         {infoCase.slice(1,24).map((dados) => {
          return (
            <Options key={dados.id} value={dados.variant}>
              {dados.variant}
            </Options>
          );
        })}
      </Selects>

      <DivInput>
      <DateDados>
      {date.map((dados) => {
          return <Paragrafo key={dados.id}>{dados}</Paragrafo>
        })}
        </DateDados>
        <input
        min='1'
        max='45'
        value={dateValue}
        onChange={(e) => dateSlectValue(Number(e.target.value))}
        type="range"
      />
      </DivInput>

    <div>
    <ComposableMap data-tip="" projectionConfig={{ scale: 110 }}>
      <Sphere fill="#0F3C4C" stroke="red" />
			<Graticule fill="#0F3C4C" stroke="black" />
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const infoGeo = geo.properties.NAME.slice(0,13);
            return (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              onMouseEnter={() => onEnter(infoGeo)}
              onMouseLeave={() => onLeave()}
              style={newStyled}
            />
          )})
        }
      </Geographies>
    </ComposableMap>
    </div>
  </>
);
};
export default memo(HomeFeatures); */