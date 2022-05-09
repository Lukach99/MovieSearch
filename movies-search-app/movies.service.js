import { TMDB_URL, API_KEY, DISCOVER_URL } from "./api.constants.js";
import { fetchData } from "./movies.http.js";

export function getTrendingURL(type) {
  return `${TMDB_URL}/3/trending/${type}/day?api_key=${API_KEY}`;
}

export function getGenresURL(genreID) {
  return `https://api.themoviedb.org/3/discover/movie?api_key=7ee9b5cbd717c8acad4d685d09606c25&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreID}&with_watch_monetization_types=flatrate`;
}
export function getMovieID(element) {
  element.addEventListener("click", (event) => {
    localStorage.setItem(
      "movieID",
      `${document.querySelector(".hide").innerHTML}`
    );
  });
}
export function getMovieIDfromList(element, id) {
  element.addEventListener("click", (event) => {
    localStorage.setItem("movieID", id);
  });
}

export function getSearchURL(word) {
  return `https://api.themoviedb.org/3/search/multi?api_key=7ee9b5cbd717c8acad4d685d09606c25&language=en-US&query=${word.replace(
    " ",
    "%20"
  )}&page=1&include_adult=false`;
}

export function createSearchItem(picture, title, id, mediaType) {
  const searchItem = document.createElement("a");

  searchItem.innerHTML = `<article class="search-item">
    <img src="https://image.tmdb.org/t/p/w500/${picture}" class="search-item__img">
    <p class="search-item__title">${title}</p>
  </article>`;
  searchBoxElement.append(searchItem);
  searchItem.addEventListener("click", (event) => {
    if (mediaType === "movie") {
      searchItem.setAttribute("href", "html-pages/movie.html");
      localStorage.setItem("movieID", `${id}`);
    } else if (mediaType === "tv") {
      searchItem.setAttribute("href", "html-pages/tv-show.html");
      localStorage.setItem("tvShowID", `${id}`);
    } else if (mediaType === "person") {
      searchItem.setAttribute("href", "html-pages/person.html");
      localStorage.setItem("personID", `${id}`);
    }
  });
}

const searchBoxElement = document.createElement("section");
searchBoxElement.classList.add("search-box");

export async function searchQuery() {
  const searchForm = document.forms.namedItem("search-form");
  const searchInput = document.getElementById("search-query");

  searchForm.addEventListener("submit", (event) => {
    let search = getSearchURL(searchInput.value);
    localStorage.setItem("searchList", JSON.stringify(search));
  });

  searchInput.addEventListener("focus", (event) => {
    document.querySelector(".main-page").prepend(searchBoxElement);
  });
  searchInput.addEventListener("blur", (event) => {
    setTimeout(() => {
      searchBoxElement.remove();
    }, 200);
  });
  searchInput.addEventListener("keyup", async (event) => {
    let search = await fetchData(getSearchURL(searchInput.value));
    searchBoxElement.innerHTML = ``;
    let searchResults = search.results;
    searchResults.forEach((result) => {
      if (result.poster_path && result.media_type === "movie") {
        createSearchItem(
          result.poster_path,
          result.title,
          result.id,
          result.media_type
        );
      } else if (result.poster_path && result.media_type === "tv") {
        createSearchItem(
          result.poster_path,
          result.name,
          result.id,
          result.media_type
        );
      } else if (result.profile_path && result.media_type === "person") {
        createSearchItem(
          result.profile_path,
          result.name,
          result.id,
          result.media_type
        );
      }
    });
    console.log(searchResults);
  });
}

export async function createDiscover(name, url) {
  const discover = await fetchData(url);
  const discoverResults = discover.results;
  const discoverElement = document.createElement("section");
  discoverElement.classList.add("discover");

  discoverElement.innerHTML = `
    <h3>${name}</h3>
          
    `;

  document.querySelector(".main-page").append(discoverElement);

  const discoverListElement = document.createElement("section");
  discoverListElement.classList.add("discover-list");
  discoverElement.append(discoverListElement);

  discoverResults.slice(0, 5).forEach((result, index) => {
    const discoverArticleElement = document.createElement("section");
    /* discoverArticleElement.setAttribute("href", "html-pages/movie.html"); */
    /* discoverArticleElement.classList.add("discover-list-item"); */
    discoverArticleElement.innerHTML = `<a href="html-pages/movie.html" class="discover-list-item"><img src="https://image.tmdb.org/t/p/w500/${result.poster_path}" alt="" />
      <p>${result.title}</p>
      </a>
      `;
    /* console.log(result); */
    discoverListElement.append(discoverArticleElement);

    getMovieIDfromList(discoverArticleElement, result.id);

    /* const watchlistBtnEl = document.createElement("button");
      watchlistBtnEl.classList.add(
        `btn-watchlist${index}${result.genres[0].name}`
      );
      watchlistBtnEl.innerText = "Watchlist+";
      discoverArticleElement.append(watchlistBtnEl);
  
      const watchlistInput = document.querySelector(
        `.btn-watchlist${index}${result.genres[0].name}`
      );
  
      watchlistInput.addEventListener("click", (event) => {
        /* watchlist.push({ id: result.id, name: result.media_type }); */
    /* console.log(result.title);
      }); */
  });
}
