import React, { useEffect, useState } from "react";
import "../styles/Banner.css";
import axios from "../services/axios";
import requests from "../services/Requests";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //fetch data from api
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const request = await axios.get(requests.fetchNetflixOriginals);
        let randomMovie;

        do {
          randomMovie =
            request.data.results[
              //randomly select a movie from the api
              Math.floor(Math.random() * request.data.results.length)
            ];
        } while (!randomMovie?.backdrop_path); //make sure there's a move picture

        setMovie(randomMovie);
      } catch (error) {
        console.error("Error fetching banner movie:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  //truncate the description with e
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  //if the content is still loading, show a loading spinner
  if (isLoading) {
    return (
      <div className="banner banner--loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h2 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h2>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
