const input = document.querySelector("#searchImg");
const search = document.querySelector("#search");
const containerGallery = document.querySelector("#gallery");
const API_KEY = "_ATNM3_x9bOySNge2mZSpKvdW58LCuIF8TYveLyIczY";
const navLinks = document.querySelectorAll(".nav-link");

document.addEventListener("DOMContentLoaded", function () {
  getNav(navLinks);
  getData("minimalist");
  input.focus();
});

search.addEventListener("click", function (event) {
  event.preventDefault();
  const valueSearch = input.value.trim();
  if (valueSearch) {
    getData(valueSearch);
  }
});

function getData(value) {
  const per_page = 20;
  const url = `https://api.unsplash.com/search/photos?&query=${value}&client_id=${API_KEY}&per_page=${per_page}`;
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

//modal Imagenes 
function showModal() {
  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modal-image");
  containerGallery.forEach((card) => {});
}


//funciones nav
function getNav(nav) {
  nav.forEach(function (link) {
    link.addEventListener("click", function () {
      const section = link.id;

      getData(section);
    });
  });
}
