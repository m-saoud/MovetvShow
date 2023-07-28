import React from "react";
import React, { useState } from 'react';
import axios from "axios";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchResults();
  };

  const fetchResults = async () => {
    try {
      const apiKey = "36e866e1d09caea1480c8ea9a195b773";
      const apiUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${query}`;
      const response = await axios.get(apiUrl);
      setResults(response.data.results);
    } catch (err) {
      console.error("Error fetching data : ", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for a movie or TV show"
        />
        <button type="submit">Search</button>
      </form>

      {results.map((item) => {
        <div key={item.id}>
          <h2>{item.title || item.name}</h2>
          <p>{item.overview}</p>
        </div>;
      })}
    </div>
  );
};

export default MovieSearch;
