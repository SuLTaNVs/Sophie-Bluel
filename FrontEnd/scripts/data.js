async function fetchData() {
  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Impossible de charger les données JSON", error);
  }
}

const gallery = document.querySelector(".gallery");
const works = await fetchData();
const filterBtn = document.querySelectorAll(".filterBtn");

works.forEach((work) => {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  img.src = work.imageUrl;
  img.setAttribute("alt", work.title);
  figure.category = work.category.name;
  figcaption.innerText = work.title;
  figure.classList.add("workfigure");
  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
});

function filterWork(e) {
  const allWorks = document.querySelectorAll(".workfigure");
  document.querySelector(".active").classList.remove("active");
  e.target.classList.add("active");

  allWorks.forEach((figure) => {
    if (
      figure.category === e.target.dataset.name ||
      e.target.dataset.name === "all"
    ) {
      figure.classList.remove("hide");
    } else {
      figure.classList.add("hide");
    }
  });
}

filterBtn.forEach((button) => {
  button.addEventListener("click", filterWork);
});
