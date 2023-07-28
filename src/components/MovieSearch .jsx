import React from "react";
import { useState } from "react";
import axios from "axios";
import './MovieSearch.css'

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
  const getImageUrl = (posterPath) => {
    if (!posterPath) {
      // Return a placeholder image URL in case the posterPath is missing
      return "https://via.placeholder.com/150";
    }
    const baseUrl = "https://image.tmdb.org/t/p/w185";
    return `${baseUrl}${posterPath}`;
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
          <h1>Movie/TV Show Search</h1>

        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for a movie or TV show"
        />
        <button type="submit" className="submit">Search</button>
      </form>
      {results.map((item) => {
        return (
          <div key={item.id} className="MovieCard">
            <img
              src={getImageUrl(item.poster_path)}
              alt={item.title || item.name}
              style={{ width: "150px", height: "225px" }}
            />
            <h2>{item.title || item.name}</h2>
            <p>{item.overview}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MovieSearch;
