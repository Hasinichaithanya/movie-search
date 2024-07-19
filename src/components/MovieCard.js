import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";

import "./moviecard.css";
const constants = {
  BEGIN: "begin",
  IN_PROGRESS: "inProgress",
  COMPLETE: "complete",
};

const MovieCardComponent = (props) => {
  const { movie } = props;
  const [moviesList, setMoviesList] = useState([]);
  const [dogImageList, setDogImageList] = useState([]);
  const [status, setStatus] = useState(constants.BEGIN);

  useEffect(() => {
    const fetchData = async () => {
      if (movie) {
        setStatus(constants.IN_PROGRESS);
        const url = `https://openlibrary.org/search.json?q=${movie}`;
        const result = await fetch(url);
        const res = await result.json();
        console.log(res.docs[0]);
        if (res.docs && res.docs.length > 0) {
          setMoviesList(res.docs.slice(0, 10));
          await fetchDogImages();
          setStatus(constants.COMPLETE);
        } else {
          setStatus(constants.BEGIN);
        }
      }
    };

    const fetchDogImages = async () => {
      const dogList = [];
      for (let i = 0; i < 10; i++) {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        dogList.push(data.message);
      }
      setDogImageList(dogList);
    };

    fetchData();
  }, [movie]);

  const renderMovies = () => {
    return moviesList.map((movie, index) => (
      <Card key={uuid()} className="movie-card">
        {" "}
        <Image
          src={dogImageList[index]}
          alt="Random dog"
          className="dog-image"
          variant="top"
        />{" "}
        <Card.Body>
          <Card.Title>Title: {movie.title}</Card.Title>
          <Card.Text>
            Author:{" "}
            {movie.author_name ? movie.author_name.join(", ") : "Unknown"}
          </Card.Text>
          <Card.Text>Number of Ratings:{movie.ratings_count}</Card.Text>
        </Card.Body>
      </Card>
    ));
  };

  return (
    <div className="main-container">
      {status === constants.BEGIN && <h1>Search here for the movies...</h1>}
      {status === constants.IN_PROGRESS && (
        <Spinner animation="grow" variant="dark" />
      )}
      {status === constants.COMPLETE && (
        <div>
          <h3>Results for: {movie}</h3>
          <div className="movies-container"> {renderMovies()}</div>
        </div>
      )}
    </div>
  );
};

export default MovieCardComponent;
