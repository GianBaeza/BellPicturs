const input = document.querySelector("#searchImg");
const search = document.querySelector("#search");
const containerGallery = document.querySelector("#gallery");
const API_KEY = "_ATNM3_x9bOySNge2mZSpKvdW58LCuIF8TYveLyIczY";
const navLinks = document.querySelectorAll(".nav-link");
const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

document.addEventListener("DOMContentLoaded", function () {
  getNav(navLinks);
  const defaultUrl = buildUrl("interior casas");
  getData(defaultUrl);
  input.focus();
});

search.addEventListener("click", function (event) {
  event.preventDefault();
  const valueSearch = input.value.trim();
  if (valueSearch) {
    const searchUrl = buildUrl(valueSearch);
    getData(searchUrl);
  }
});
//menuHamburguesa
abrir.addEventListener("click", () => {
  nav.classList.add("nav-visible");
});
cerrar.addEventListener("click", () => {
  nav.classList.remove("nav-visible");
});
// urlFetch
function buildUrl(query) {
  const per_page = 20;
  return `https://api.unsplash.com/search/photos?&query=${query}&client_id=${API_KEY}&per_page=${per_page}`;
}
//data de  la api
function getData(url) {
  fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const imgData = data.results.map((item) => {
        const {
          id,
          alt_description,
          urls: { small: photo },
          user: { name },
        } = item;
        return { id, alt_description, photo, name };
      });
      displayImages(imgData);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
//mostramos img
function displayImages(imgData) {
  containerGallery.innerHTML = "";

  imgData.forEach(({ id, alt_description, photo, name }) => {
    const containerCardImg = document.createElement("div");
    containerCardImg.classList.add("cardImg");

    const img = document.createElement("img");
    img.src = photo;
    img.alt = alt_description;
    img.classList.add("img");

    const title = document.createElement("h3");
    title.textContent = name;
    title.classList.add("title-img");

    containerCardImg.appendChild(img);
    containerCardImg.appendChild(title);
    containerGallery.appendChild(containerCardImg);
  });
}

// ModalImagenes
function showModal() {}

// Funcionesnav
function getNav(navLinks) {
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      const section = link.id;
      const sectionUrl = buildUrl(section);
      getData(sectionUrl);
    });
  });
}
