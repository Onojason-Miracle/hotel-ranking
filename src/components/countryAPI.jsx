import React, { useState, useEffect } from "react";

const CountryAPI = ({ onCountriesFetched }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
        );
        const data = await response.json();
        setCountries(data.map((country) => country.name));
        onCountriesFetched(data.map((country) => country.name));
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchData();
  }, [onCountriesFetched]);

  return <div></div>;
};

export default CountryAPI;
