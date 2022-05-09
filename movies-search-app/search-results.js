async function fetchData(url) {
  const res = await fetch(url).then((res) => res.json());
  return res;
}

if (localStorage.getItem("searchList")) {
  const search = await fetchData(
    JSON.parse(localStorage.getItem("searchList"))
  );
  const searchResults = search.results;

  searchResults.forEach((result) => {
    const discoverArticleElement = document.createElement("a");
    discoverArticleElement.classList.add("discover-list-item");

    if (result.media_type === "movie" && result.poster_path) {
      discoverArticleElement.setAttribute("href", "movie.html");
      discoverArticleElement.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${result.poster_path}" alt="" />
        <p>${result.title}</p>
        `;
      discoverArticleElement.addEventListener("click", (event) => {
        localStorage.setItem("movieID", result.id);
      });
      document.querySelector(".main-page").append(discoverArticleElement);
    } else if (result.media_type === "tv" && result.poster_path) {
      discoverArticleElement.setAttribute("href", "tv-show.html");
      discoverArticleElement.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${result.poster_path}" alt="" />
        <p>${result.name}</p>
        `;
      discoverArticleElement.addEventListener("click", (event) => {
        localStorage.setItem("tvShowID", result.id);
      });
      document.querySelector(".main-page").append(discoverArticleElement);
    } else if (result.media_type === "person" && result.profile_path) {
      discoverArticleElement.setAttribute("href", "person.html");
      discoverArticleElement.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${result.profile_path}" alt="" />
        <p>${result.name}</p>
        `;
      discoverArticleElement.addEventListener("click", (event) => {
        localStorage.setItem("personID", result.id);
      });
    }
  });
}

if (localStorage.getItem("user-info")) {
  const userInfo = JSON.parse(localStorage.getItem("user-info"));
  console.log(userInfo);
  document.querySelector(".user").innerText = userInfo.name;
}
