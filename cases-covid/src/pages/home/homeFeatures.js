import React, { memo, useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography} from 'react-simple-maps';
import axios from 'axios';
import { Apikey, BASE_URL } from '../../constants/urls';
import { Button, DadosP, DateDados, DivInfo, DivInput, Options, Paragrafo, Selects } from './style';
const _ = require("lodash"); 

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

function HomeFeatures({ setTooltipContent }) {
	const [ infoCase, setInfoCases ] = useState([]);
  const [ nameVariant, setNameVariant ] = useState('Alpha')
  const [ date, setDate ] = useState([])
  const [ dateSelect, setDateSelect] = useState('2020-05-11')
  const [ dateValue, setDateValue ] = useState(0)
  const [ habilitButton, setHabilitButton ] = useState(true)

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
		})
    .catch((err) => {
      console.log(err.response);
    })
	};

	function getTotalCases(coutryName) {
		const covidDataTemp = infoCase.filter((coutry) => coutry.location === coutryName);
    const dadosFiltrados = _.uniq(covidDataTemp)
    const infoMore = dadosFiltrados.filter((info) => info.date === dateSelect && info.variant === nameVariant)
    return infoMore.reduce((previousValue, currentValue) => previousValue + currentValue.num_sequences_total, 0)
	}

  const dateCorrect = () => {
    const filterRepetidos = infoCase.map((res) => res.date)
    const filtrados = _.uniq(filterRepetidos)
    let newArray = []
    for(let i = 0; i <= filtrados.length; i+=5){
      newArray.push(filtrados[i])
    }
    setDate(newArray)
    infoButton();
  }

  let arr = date;
  const onClickMap = () => {
      for(let x = dateValue; x <= arr.length; x++){
        (function(x){
          setTimeout(function(){
            setDateSelect(arr[x]);
            setDateValue(x)
           }, x * 2000); // 1000 = 1 segundo
        }(x));
     }
  }

  const infoButton = () => {
    setTimeout(function () {
        setHabilitButton(false)
    }, 4000)
  }

	useEffect(() => {
		getInfoCountry();
	});


	return (
    <>
    <div>
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

      <Button disabled={habilitButton} onClick={() => onClickMap()}> ▶ Play Covid</Button>

    </div>

    <DivInfo>
      <DadosP>Date: {dateSelect}</DadosP>
      <DadosP>Variant: {nameVariant}</DadosP>
    </DivInfo>

      <DivInput>
      <DateDados>
      {date.map((dados, index) => {
          return <Paragrafo key={index}>{dados}</Paragrafo>
        })}
        </DateDados>
        <input
        min='1'
        max='9'
        value={dateValue}
        onChange={(e) => dateSlectValue(Number(e.target.value))}
        type="range"
      />
      </DivInput>

      <div className="mx-1">
    <ComposableMap data-tip="" projectionConfig={{ scale: 180 }}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const infoGeo = geo.properties.NAME.slice(0,13);
            const resultado = getTotalCases(infoGeo)      

            return (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              onMouseEnter={() => {
                let data = [];
                const totalCases = getTotalCases(infoGeo)
                infoCase.forEach((info) => {
                  if (info.location === infoGeo) {
                    data = info;
                  }
                })
                setTooltipContent(`
                Country: ${data.location || infoGeo} |
                Cases total: ${totalCases}
                `);
              }}
              onMouseLeave={() => setTooltipContent("")}
              fill={ resultado <= 4 ? '#dbbbb8' : resultado <= 200 ? '#e67a70' : resultado <= 1000 ? '#cf2e1f' : '#8f1106'}
              stroke={"black"}

              style={{hover: {
                fill: "#1B89AE",
                outline: "none"
              }}}
            />
          )})
        }
      </Geographies>
    </ComposableMap>
    </div>
  </>
);
};
export default memo(HomeFeatures);