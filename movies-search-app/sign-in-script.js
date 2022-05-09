const gen = await fetch(
  "https://api.themoviedb.org/3/genre/movie/list?api_key=7ee9b5cbd717c8acad4d685d09606c25&language=en-US"
).then((res) => res.json());

console.log(gen);

function onChange() {
  const userName = document.getElementById("user-name");
  const userEmail = document.getElementById("user-email");
  const userPassword = document.getElementById("user-password1");
  const userConfirm = document.getElementById("user-password2");

  const registerForm = document.querySelector(".register-form");

  userConfirm.addEventListener("change", (event) => {
    if (userConfirm.value != userPassword.value) {
      document.querySelector("button").disabled = true;
      console.log("not correct");
    } else {
      document.querySelector("button").disabled = false;
      console.log("correct");
    }
  });

  registerForm.addEventListener("submit", (event) => {
    const userInfo = {
      name: userName.value,
      email: userEmail.value,
      password: userPassword.value,
    };
    localStorage.setItem("user-info", JSON.stringify(userInfo));
  });
}

if (localStorage.getItem("user-info")) {
  document.querySelector(
    ".register-page"
  ).innerHTML = `<section class="pick-genres">
  <p>Please pick your genres</p>
</section>`;
  pickGenres();
  console.log("user already exist");
} else {
  onChange();
}

if (localStorage.getItem("user-info")) {
  const userInfo = JSON.parse(localStorage.getItem("user-info"));
  console.log(userInfo);
  document.querySelector(".user").innerText = userInfo.name;
}

async function pickGenres() {
  const genresElement = document.querySelector(".pick-genres");
  const genr = gen.genres;

  const userGenresList = [];
  console.log(genr);
  genr.forEach((genre) => {
    const genresItemElement = document.createElement("p");
    genresItemElement.classList.add("genre");
    genresItemElement.innerText = genre.name;
    genresElement.append(genresItemElement);

    genresItemElement.addEventListener("click", (event) => {
      userGenresList.push({ name: genre.name, id: genre.id });
      localStorage.setItem("user-genres", JSON.stringify(userGenresList));
      console.log(userGenresList);
    });
  });
}
