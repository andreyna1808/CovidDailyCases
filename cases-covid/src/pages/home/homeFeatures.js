import React, { useEffect, useState } from 'react';
import { csv } from 'https://cdn.skypack.dev/d3-fetch@3';
import { ComposableMap, Geographies, Geography, Sphere, Graticule } from 'react-simple-maps';
import axios from 'axios';
import { Apikey, BASE_URL } from '../../constants/urls';

const geoUrl = 'https://unpkg.com/world-atlas/countries-50m.json';

export default function HomeFeatures() {
  const [ tooltip, setTooltip ] = useState('');
	const [ data, setData ] = useState([]);
	const [ infoCase, setInfoCases ] = useState([]);

	const getInfoCountry = () => {
		axios.get(`${BASE_URL}`, Apikey).then((res) => {
			setInfoCases(res.data);
		});
	};

	function getTotalCasesByCountryName(coutryName) {
		const covidDataTemp = infoCase.filter((coutry) => coutry.location === coutryName);
    const totalCases = covidDataTemp.reduce((previousValue, currentValue) => previousValue + currentValue.num_sequences_total,
      0)

    return totalCases
	}

  const onEnter = (dados) => {
    let data = [];
    const totalCases = getTotalCasesByCountryName(dados)
    infoCase.forEach((info) => {
      if (info.location === dados) {
        data = info;
      }
    })
    setTooltip(`
        ${data.location || dados} |
        ${data.date} |
        ${data.variant} |
        ${totalCases} 
      `);
  };

  console.log(tooltip);


  const onMouseLeave = () => {
    setTooltip("");
  };

	useEffect(() => {
		csv(`/vulnerability.csv`).then((data) => {
			setData(data);
			getInfoCountry();
		});
	}, []);

	return (
		<div>
			<ComposableMap
				projectionConfig={{
					rotate: [ -10, 0, 0 ],
					scale: 140}}>
            
				<Sphere fill="blue" stroke="red" />
				<Graticule fill="blue" stroke="black" />
					<Geographies fill="orangered" stroke="black" geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => onEnter(geo.properties.name)}
                  onMouseLeave={onMouseLeave}
                  style={{
                    hover: {
                      fill: 'grey',
                      cursor: 'pointer'
                    }
                  }}
                />
              );
            })}
        </Geographies>
			</ComposableMap>
		</div>
	);
}
