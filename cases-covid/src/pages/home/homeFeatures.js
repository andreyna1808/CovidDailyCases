import React, { memo, useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Graticule, Sphere } from 'react-simple-maps';
import axios from 'axios';
import { Apikey, BASE_URL } from '../../constants/urls';
import { Button, DateDados, DivInput, Options, Paragrafo, Selects } from './style';
const _ = require("lodash"); 

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

function HomeFeatures({ setTooltipContent }) {
	const [ infoCase, setInfoCases ] = useState([]);
  const [ nameVariant, setNameVariant ] = useState('Alpha')
  const [ date, setDate ] = useState([])
  const [ dateSelect, setDateSelect] = useState('2020-05-11')
  const [ dateValue, setDateValue ] = useState(0)
  const [habilitButton, setHabilitButton ] = useState(true)

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
    },3000)
  }
   


	useEffect(() => {
		getInfoCountry();
	}, [date]);


	return (
    <>
    <div>
      <Selects onChange={onChange}>
        <Options value={nameVariant}>Alpha</Options>
         {infoCase.slice(0,24).map((dados) => {
          return (
            <Options key={dados.id} value={dados.variant}>
              {dados.variant}
            </Options>
          );
        })}
      </Selects>

      <Button disabled={habilitButton} onClick={() => onClickMap()}> ▶ Play Covid</Button>

    </div>

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
    <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
      <Sphere fill="#0F3C4C"/>
			<Graticule fill="#0F3C4C"/>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const infoGeo = geo.properties.NAME.slice(0,13);
            const covidDate = infoCase.filter((coutry) => coutry.location.slice(0,13) === infoGeo)
            const resultMore = covidDate.filter((info) => info.date === dateSelect && info.variant === nameVariant)
            const resultado =  resultMore.reduce((previousValue, currentValue) => previousValue + currentValue.num_sequences_total, 0)
	
            return (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              onMouseEnter={() => onEnter(infoGeo)}
              onMouseLeave={() => onLeave()}
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