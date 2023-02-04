import React, { useState, useEffect } from 'react'
import axios from '../axios';
import "../Row.css";
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {

  const [movies, setMovies] = useState( [] );
  const [trailerUrl, setTrailerUrl] = useState("");

    // useEffect -> a snippet of code which runs based on a specific condition/variable.
    useEffect (() => {
        // if 2nd parameter, run once when the row loads, and don't run again
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            // console.log(request.data.results);
            return request;
        }

        fetchData();
    }, [fetchUrl]);
    // Note: we gave 2nd parameter as fetchUrl because, we are using a outside variable inside the useEffect,
    // so, in order to make the re rendering happen, we will have to give that variable as a second parameter.

    const opts = {
      height: "390",
      width: "100%",
      playerVars: {
        autoplay:1,
      },
    };

    const handleClick = (movie) => {
        if(trailerUrl) {
          setTrailerUrl("");
        }
        else{
          movieTrailer(movie?.name || "")
          .then((url) => {
              const urlParams = new URLSearchParams(new URL(url).search);
              setTrailerUrl(urlParams.get("v"));

          }).catch((error) => console.log(error));
        }
    }

  return (
    <div className="row">
        {/* Title */}
        <h2>{title}</h2>
        
        {/* Container -> several row posters */}
        <div className='row__posters'>
            {movies.map(movie => (
                // adding key for every element will make our code more optimized and display will be even more smoother.
                <img
                key={movie.id}
                onClick = {() => handleClick(movie)}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`${base_url }${isLargeRow ? movie.poster_path : movie.backdrop_path }`} alt={movie.name} 
                />
            ))}
        </div> 
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}        
    </div>
  )
}

export default Row
