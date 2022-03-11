import React, { useEffect, useState } from "react";
import { csv } from "https://cdn.skypack.dev/d3-fetch@3";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";
import axios from "axios";
import { Apikey, BASE_URL } from "../../constants/urls";

const geoUrl = 'https://unpkg.com/world-atlas/countries-50m.json'

export default function Home() {
    const [data, setData] = useState([]);
    const [infoCases, setInfoCases] = useState([])
    const [qtdCases, setQtdCases] = useState([])
    const [location, setLocation] = useState([])


    const getInfoCountry = () => {
      axios.get('https://jhhirgbpxccjtayyefxd.supabase.co/rest/v1/covidCases?id=eq.1&select=*', Apikey)
      .then((res) => {
        setInfoCases(res.data)
        console.log(res.data);
      })
    }
  
    useEffect(() => {
      csv(`/vulnerability.csv`).then((data) => {
        setData(data);
        getInfoCountry();
      });
    }, []);
  
    return (
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 140
        }}
      >
        <Sphere fill="blue"  stroke="red" />
        <Graticule fill="blue" stroke="black" />
        {data.length > 0 && (
          <Geographies fill="orangered" stroke="black" geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                return (
                  <Geography
/*                     onMouseEnter={() => verifyCountry(geo.properties.name)}
 */                    key={geo.rsmKey}
                    geography={geo}
                  />
                );
              })
            }
          </Geographies>
        )}
      </ComposableMap>
    );
  };