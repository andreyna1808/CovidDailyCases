/* import React, { memo, useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Graticule, Sphere } from 'react-simple-maps';
import axios from 'axios';
import { Apikey, BASE_URL } from '../../constants/urls';
import { DateDados, DivInput, Options, Paragrafo, Selects } from './style';
const _ = require("lodash"); 

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

function HomeFeatures({ setTooltipContent }) {
	const [ infoCase, setInfoCases ] = useState([]);
  const [ selectVariant, setSelectVariant] = useState([])
  const [ nameLocation, setNameLocation] = useState([])
  const [ selectDate, setSelectDate ] = useState([])
  const [ nameVariant, setNameVariant ] = useState('Alpha')
  const [ date, setDate ] = useState([])
  const [ dateSelect, setDateSelect] = useState('2020-05-11')
  const [ dateValue, setDateValue ] = useState(0)
  const [ newStyled, setNewStyled ] = useState({
    default: {
      fill: "#D6D6DA",
      stroke: "black",
      outline: "none",
    },
    hover: {
      fill: "#1B89AE",
      outline: "none"
    }
  })

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
		})
    .catch((err) => {
      console.log(err.response);
    })
	};
  const getVariant = () => {
    axios.get(`${BASE_URL}?select=variant`, Apikey).then((res) => {
			setSelectVariant(res.data);
		}).catch((err) => {
      console.log(err.response);
    })
  }
  const getDate = () => {
    axios.get(`${BASE_URL}?select=date`, Apikey).then((res) => {
			setSelectDate(res.data);
      dateCorrect()
		}).catch((err) => {
      console.log(err.response);
    })
  }
  const getName = () => {
    axios.get(`${BASE_URL}?select`, Apikey).then((res) => {
      console.log(res.data);
			setNameLocation(res.data);
		}).catch((err) => {
      console.log(err.response);
    })
  }

	function getTotalCases(coutryName) {
		const covidDataTemp = infoCase.filter((coutry) => coutry.location.toLowerCase().split("").sort().join("").trim().slice(0,12) === coutryName);
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
    const filterRepetidos = selectDate.map((res) => res.date)
    const filtrados = _.uniq(filterRepetidos)
    setDate(filtrados)
  }

	useEffect(() => {
			getInfoCountry();
      getVariant();
      getDate();
      getName();
	}, [infoCase, selectVariant, selectDate]);


	return (
    <>
      <Selects onChange={onChange}>
        <Options value={nameVariant}>Alpha</Options>
         {selectVariant.slice(1,24).map((dados) => {
          return (
            <Options key={dados.id} value={dados.variant}>
              {dados.variant}
            </Options>
          );
        })}
      </Selects>

      <DivInput>
      <DateDados>
      {date.map((dados, index) => {
          return <Paragrafo key={index}>{dados}</Paragrafo>
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
            const infoGeo = geo.properties.NAME.toLowerCase().split("").sort().join("").trim().slice(0,12);
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