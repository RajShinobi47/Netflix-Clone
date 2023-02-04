import axios from "axios";

// Base URL to make requests to the movie database

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

// instance.get('/foo-bar');
// It will look like https://api.themoviedb.org/3/foo-bar

export default instance;