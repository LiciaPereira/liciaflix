import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import "../styles/Row.css";
import {
  movieMessages,
  dismissButtonTexts,
  getRandomItem,
} from "../services/messages";

function Row({ title, fetchURL, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const base_url = "https://image.tmdb.org/t/p/original";

  //show fun alert message
  const showFunAlert = (movie) => {
    const overlay = document.createElement("div");
    overlay.classList.add("fun-overlay");

    const alertBox = document.createElement("div");
    alertBox.classList.add("fun-alert");

    const titleEl = document.createElement("h3");
    titleEl.classList.add("fun-alert__title");
    titleEl.textContent = movie.name || movie.title;

    const messageEl = document.createElement("p");
    messageEl.classList.add("fun-alert__message");
    messageEl.textContent = getRandomItem(movieMessages);

    const closeButton = document.createElement("button");
    closeButton.textContent = getRandomItem(dismissButtonTexts);
    closeButton.addEventListener("click", () => overlay.remove());
    alertBox.appendChild(titleEl);
    alertBox.appendChild(messageEl);
    alertBox.appendChild(closeButton);
    overlay.appendChild(alertBox);
    document.body.appendChild(overlay);

    //auto-remove after 6 seconds
    setTimeout(() => {
      if (document.body.contains(overlay)) {
        overlay.remove();
      }
    }, 6000);
  };

  //fetch data from api and handle loading state
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const request = await axios.get(fetchURL);
        setMovies(request.data.results);
        return request;
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [fetchURL]);

  //handle loading state with a simple placeholder
  if (isLoading) {
    return (
      <div className="row">
        <h2>{title}</h2>
        <div className="row__posters row__posters--loading">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`row__poster row__poster--placeholder ${
                isLargeRow && "row__posterLarge"
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

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
                // add loading lazy for better performance
                loading="lazy"
                // use different sizes for better responsiveness
                srcSet={`${base_url}/w300${movie.poster_path} 300w,
                        ${base_url}/w500${movie.poster_path} 500w,
                        ${base_url}${movie.poster_path} 780w`}
                sizes="(max-width: 768px) 300px,
                       (max-width: 1200px) 500px,
                       780px"
                src={`${base_url}${movie.poster_path}`}
                alt={movie.name}
                onClick={() => showFunAlert(movie)}
              />
            )
        )}
      </div>
    </div>
  );
}

export default Row;
