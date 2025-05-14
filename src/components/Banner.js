import React, { useEffect, useState } from "react";
import "../styles/Banner.css";
import axios from "../services/axios";
import requests from "../services/Requests";
import {
  bannerMessages,
  dismissButtonTexts,
  getRandomItem,
} from "../services/messages";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  //show fun alert message
  const showFunAlert = (action) => {
    const overlay = document.createElement("div");
    overlay.classList.add("fun-overlay");

    const alertBox = document.createElement("div");
    alertBox.classList.add("fun-alert");

    const titleEl = document.createElement("h3");
    titleEl.classList.add("fun-alert__title");
    titleEl.textContent = action === "play" ? "Play Movie" : "My List";

    const messageEl = document.createElement("p");
    messageEl.classList.add("fun-alert__message");
    messageEl.textContent = getRandomItem(bannerMessages);

    const closeButton = document.createElement("button");
    closeButton.textContent = getRandomItem(dismissButtonTexts);
    closeButton.addEventListener("click", () => overlay.remove());

    alertBox.appendChild(titleEl);
    alertBox.appendChild(messageEl);
    alertBox.appendChild(closeButton);
    overlay.appendChild(alertBox);
    document.body.appendChild(overlay);

    setTimeout(() => {
      if (document.body.contains(overlay)) {
        overlay.remove();
      }
    }, 6000);
  };

  //get optimized image URL based on screen size
  const getOptimizedImageUrl = (path) => {
    //use smaller image for mobile devices
    const width = window.innerWidth;
    const size = width <= 768 ? "w780" : "original";
    return `https://image.tmdb.org/t/p/${size}/${path}`;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const request = await axios.get(requests.fetchNetflixOriginals);

        // Filter movies that have backdrop images
        const moviesWithBackdrops = request.data.results.filter(
          (movie) => movie.backdrop_path
        );

        if (moviesWithBackdrops.length > 0) {
          const randomMovie =
            moviesWithBackdrops[
              Math.floor(Math.random() * moviesWithBackdrops.length)
            ];

          // Preload image
          const img = new Image();
          img.src = getOptimizedImageUrl(randomMovie.backdrop_path);
          img.onload = () => {
            setMovie(randomMovie);
            setImageLoaded(true);
            setIsLoading(false);
          };
        }
      } catch (error) {
        console.error("Error fetching banner movie:", error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  //truncate the description
  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  if (isLoading) {
    return (
      <div className="banner banner--loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <header
      className={`banner ${!imageLoaded ? "banner--loading" : ""}`}
      style={{
        backgroundImage: `url('${getOptimizedImageUrl(movie?.backdrop_path)}')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button
            className="banner__button"
            onClick={() => showFunAlert("play")}
          >
            Play
          </button>
          <button
            className="banner__button"
            onClick={() => showFunAlert("mylist")}
          >
            My List
          </button>
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
