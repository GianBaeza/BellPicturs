const input = document.querySelector("#searchImg");
const search = document.querySelector("#search");
const containerImgs = document.querySelector("#gallery");
const API_KEY = "_ATNM3_x9bOySNge2mZSpKvdW58LCuIF8TYveLyIczY";

search.addEventListener("click", function (event) {
  event.preventDefault();
  const valueSearch = input.value.trim();
  if (valueSearch) {
    getData(valueSearch);
  } else {
    const a = "minimalist";
    getData("paisajes");
  }
});

function getData(value) {
  const url = `https://api.unsplash.com/search/photos?&query=${value}&client_id=${API_KEY}`;
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
  containerImgs.innerHTML = " ";
  imgData.forEach(({ id, alt_description, photo, name }) => {
    //containerCard
    const contianerCardImg = document.createElement("div");
    containerImgs.classList.add("container-Img");
    //immagen
    const cardImg = document.createElement("img");
    cardImg.src = photo;
    cardImg.alt = alt_description;
    cardImg.classList.add("imagenes");

    //titleimagen hover
    const title = document.createElement("h3");
    title.textContent = name;
    title.classList.add("title-img-hover");

    contianerCardImg.appendChild(cardImg);
    contianerCardImg.appendChild(title);
    containerImgs.appendChild(contianerCardImg);
  });
}
//Corregir esto 
contianerCardImg.addEventListener("mouseover", () => {
  title.classList.add("title-img-hover"); // Mostramos el título cuando el mouse pasa sobre la imagen
});
contianerCardImg.addEventListener("mouseout", () => {
  title.classList.remove("title-img-hover"); // Ocultamos el título cuando el mouse sale de la imagen
});
