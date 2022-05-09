import { fetchData } from "./movies-search-app/movies.http.js";
import {
  getGenresURL,
  getMovieID,
  getMovieIDfromList,
  getSearchURL,
  getTrendingURL,
  searchQuery,
  createDiscover,
} from "./movies-search-app/movies.service.js";

/* const API_KEY = "7ee9b5cbd717c8acad4d685d09606c25";
const TMDB_URL = "https://api.themoviedb.org";

const DISCOVER_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`; */

const featuredMovies = document.createElement("article");
featuredMovies.classList.add("featured-movies");

const data = await fetchData(getTrendingURL("movie"));
/* const discover = await fetchData(DISCOVER_URL); */

const watchlist = [];

const results = data.results;

function featured() {
  const featuredElement = document.createElement("section");
  featuredElement.classList.add("featured");
  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", "html-pages/movie.html");
  featuredElement.append(linkElement);
  linkElement.append(featuredMovies);

  featuredMovies.style.backgroundImage = `url("https://image.tmdb.org/t/p/original/${results[0].backdrop_path}")`;

  featuredMovies.innerHTML = `
  <h3 class="">${results[0].title}</h3>
<p class="">${results[0].overview}</p>
<p class="hide">${results[0].id}</p>`;
  document.querySelector(".main-page").prepend(featuredElement);

  getMovieID(featuredMovies);
}

function nextMovie() {
  let i = 1;
  setInterval(() => {
    featuredMovies.style.backgroundImage = `url("https://image.tmdb.org/t/p/original/${results[i].backdrop_path}")`;
    featuredMovies.innerHTML = `
<h3 class="featured-movies__h3">${results[i].title}</h3>
<p class="featured-movies__h3">${results[i].overview}</p>
<p class="hide">${results[i].id}</p>`;

    i++;
    if (i === 7) {
      i = 0;
    }
  }, 4000);
}

if (localStorage.getItem("user-genres")) {
  const starting = JSON.parse(localStorage.getItem("user-genres"));
  starting.forEach((element) => {
    createDiscover(`Popular ${element.name}`, getGenresURL(element.id));
  });
}

if (localStorage.getItem("user-info")) {
  const userInfo = JSON.parse(localStorage.getItem("user-info"));
  console.log(userInfo);
  document.querySelector(".user").innerText = userInfo.name;
}

featured();
nextMovie();

await searchQuery();
