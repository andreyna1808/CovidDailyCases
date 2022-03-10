import React, { useEffect, useState } from "react";
import { csv } from "https://cdn.skypack.dev/d3-fetch@3";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";

const geoUrl = 'https://unpkg.com/world-atlas/countries-50m.json'

export default function Home() {
    const [data, setData] = useState([]);
    const [infoCases, setInfoCases] = useState([])
    const [qtdCases, setQtdCases] = useState([])
    const [location, setLocation] = useState([])
  
    useEffect(() => {
      csv(`/vulnerability.csv`).then((data) => {
        setData(data);
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
                console.log(geo);
                return (
                  <Geography
                    key={geo.rsmKey}
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