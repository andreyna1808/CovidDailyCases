import React, { memo, useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Graticule, Sphere } from 'react-simple-maps';
import axios from 'axios';
import { Apikey, BASE_URL } from '../../constants/urls';

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

function HomeFeatures({ setTooltipContent }) {
	const [ infoCase, setInfoCases ] = useState([]);

	const getInfoCountry = () => {
		axios.get(`${BASE_URL}`, Apikey).then((res) => {
			setInfoCases(res.data);
		});
	};

	function getTotalCases(coutryName) {
		const covidDataTemp = infoCase.filter((coutry) => coutry.location === coutryName);
    return covidDataTemp.reduce((previousValue, currentValue) => previousValue + currentValue.num_sequences_total, 0)
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
        Date: ${data.date} |
        Variant: ${data.variant} |
        Total Cases: ${totalCases} 
      `);
  };

  const onLeave = () => {
    setTooltipContent("");
  };

	useEffect(() => {
			getInfoCountry();
	}, []);

	return (
    <>
    <ComposableMap data-tip="" projectionConfig={{ scale: 110 }}>
      <ZoomableGroup>
      <Sphere fill="#0F3c4c" stroke="red" />
				<Graticule fill="#0F3c4c" stroke="black" />
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => onEnter(geo.properties.NAME)}
                onMouseLeave={() => onLeave()}
                style={{
                  default: {
                    fill: "#D6D6DA",
                    stroke: "black",
                    outline: "none",
                  },
                  hover: {
                    fill: "#1b89ae",
                    outline: "none"
                  }
                }}
              />
            )})
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  </>
);
};


export default memo(HomeFeatures);