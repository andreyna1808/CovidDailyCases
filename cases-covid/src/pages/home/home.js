import React, { useEffect, useState } from 'react';
import { csv } from 'https://cdn.skypack.dev/d3-fetch@3';
import { ComposableMap, Geographies, Geography, Sphere, Graticule } from 'react-simple-maps';
import axios from 'axios';
import { Apikey, BASE_URL } from '../../constants/urls';
import { useNavigate } from 'react-router-dom';

const geoUrl = 'https://unpkg.com/world-atlas/countries-50m.json';

export default function Home() {
	const navigate = useNavigate();
	const [ data, setData ] = useState([]);
	const [ infoCase, setInfoCases ] = useState([]);
	const [ variantCase, setVariantCase ] = useState('');
  const [tooltipContent, setTooltipContent] = useState("");
  const [location, setLocation] = useState([])


	const getInfoCountry = () => {
		axios.get(`${BASE_URL}`, Apikey).then((res) => {
			setInfoCases(res.data);
		});
	};

  const getCountries = () => {
    axios.get(`${BASE_URL}?select=location`, Apikey)
    .then((res) => {
      setLocation(res.data)
    })
  }
  const onMouseEnter = (geo, current = { value: "NA" }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}: ${current.value}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent("");
  };

	function getTotalCasesByCountryName(coutryName) {
		const covidDataTemp = infoCase.filter((coutry) => coutry.location === coutryName);
	}

	useEffect(() => {
		csv(`/vulnerability.csv`).then((data) => {
			setData(data);
			getInfoCountry();
      getCountries()
		});
	}, []);

	return (
		<div>
			<ComposableMap
				projectionConfig={{
					rotate: [ -10, 0, 0 ],
					scale: 140
				}}
			>
				<Sphere fill="blue" stroke="red" />
				<Graticule fill="blue" stroke="black" />
				{data.length > 0 && (
					<Geographies fill="orangered" stroke="black" geography={geoUrl}>
						{({ geographies }) =>
							geographies.map((geo) => {
                const current = data.find((s) => {
                  return s.id === geo.id;
                });
								return (
									<Geography
										key={geo.rsmKey}
										geography={geo}
										onMouseEnter={onMouseEnter(geo, current)}
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
				)}
			</ComposableMap>
		</div>
	);
}
