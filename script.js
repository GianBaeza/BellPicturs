const input = document.querySelector("#searchImg");
const search = document.querySelector("#search");
const containerImg = document.querySelector("#gallery");





document.addEventListener("DOMContentLoaded", async function () {
  const query = input.value.trim();
  input.focus();
  if (!query) {
    await searchmIg("Paisajes");
  } else {
    await searchmIg(query);
  }
});

search.addEventListener("click", function () {
  const query = input.value.trim();
  searchmIg(query);
});

async function searchmIg(query) {
  const API_KEY = "eySQClLCffh5UwJKLBoHnDFiVrvsHmHrMSqAFz2s6IY4JxgfJvCkgpAG";
  const apiURL = `https://api.pexels.com/v1/search?query=${query}&per_page=200`;

  try {
    const response = await fetch(apiURL, {
      method: "GET",
      headers: {
        Accept: "application.json",
        authorization: API_KEY,
      },
    });
    const { photos } = await response.json();

    updateGarelly(photos);
  } catch (error) {
    console.error("Error al fetch las imágenes:", error);
  }
}

function updateGarelly(photos) {
  containerImg.innerHTML = " ";

  photos.forEach(({ src, alt }) => {
    const img = document.createElement("img");
    img.classList.add("imagenes");
    img.src = src.portrait;
    img.dataset.src = src.original;
    img.alt = alt;
    img.loading = "lazy";
    containerImg.appendChild(img);
  });
}

function handleError(error) {
  console.error("Error fetching images:", error);
  containerImg.innerHTML =
    "<p>Ocurrió un error al buscar las imágenes. Por favor, intenta de nuevo.</p>";
}
