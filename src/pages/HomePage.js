import React from "react";
import "../styles/HomeScreen.css";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import requests from "../services/Requests";
import Row from "../components/Row";

function HomePage() {
  return (
    <div className="homeScreen">
      <NavBar />
      <Banner />
      <Row
        title="Netflix Originals"
        fetchURL={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending" fetchURL={requests.fetchTrending} />
      <Row title="Top Rated" fetchURL={requests.fetchTopRated} />
      <Row title="Action" fetchURL={requests.fetchActionMovies} />
      <Row title="Comedy" fetchURL={requests.fetchComedyMovies} />
      <Row title="Documentaries" fetchURL={requests.fetchDocumentaries} />
      <Row title="Romance" fetchURL={requests.fetchRomanceMovies} />
    </div>
  );
}

export default HomePage;
