import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import "../styles/Row.css";

function Row({ title, fetchURL, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const base_url = "https://image.tmdb.org/t/p/original";

  //fetch data from api
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies?.map(
          (movie) =>
            movie.poster_path && (
              <img
                //if it's the main first row, add the row__posterLarge class
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                key={movie.id}
                src={`${base_url}${movie.poster_path}`}
                alt={movie.name}
              />
            )
        )}
      </div>
    </div>
  );
}

export default Row;
