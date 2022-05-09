const movieid = localStorage.getItem("movieID");
console.log(movieid);

async function fetchMovie() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieid}?api_key=7ee9b5cbd717c8acad4d685d09606c25&language=en-US`
  ).then((res) => res.json());
  return res;
}

const data = await fetchMovie();
console.log(data);

document.querySelector(".movie-page").innerHTML = `<h2>${data.title}</h2>
<img src="https://image.tmdb.org/t/p/original/${data.backdrop_path}" class="movie__page-img">
<p>${data.overview}</p>`;

if (localStorage.getItem("user-info")) {
  const userInfo = JSON.parse(localStorage.getItem("user-info"));
  console.log(userInfo);
  document.querySelector(".user").innerText = userInfo.name;
}
