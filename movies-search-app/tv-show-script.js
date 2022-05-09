const tvShowid = localStorage.getItem("tvShowID");
console.log(tvShowid);

async function fetchTvShow() {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${tvShowid}?api_key=7ee9b5cbd717c8acad4d685d09606c25&language=en-US`
  ).then((res) => res.json());
  return res;
}

const data = await fetchTvShow();
console.log(data);

document.querySelector(".movie-page").innerHTML = `<h2>${data.name}</h2>
<img src="https://image.tmdb.org/t/p/original/${data.poster_path}" class="movie__page-img">
<p>${data.overview}</p>`;

if (localStorage.getItem("user-info")) {
  const userInfo = JSON.parse(localStorage.getItem("user-info"));
  console.log(userInfo);
  document.querySelector(".user").innerText = userInfo.name;
}
