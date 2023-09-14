let favrecipe = [
  {
    id: "1694415809280",
    title: "burger",
    time: "1998",
    steps: "img",
    image: "url",
  },
];
function updaterecipeListUI() {
  clearApp();
  for (let i = 0; i < favrecipe.length; i++) {
    const recipeDiv = makerecipeDiv(favrecipe[i]);
    const app = document.querySelector("#app");
    app.appendChild(recipeDiv);
  }
}
function makerecipeDiv(recipe) {
  const div = document.createElement("div");
  div.setAttribute("class", "recipe-card");

  const id = `recipe-${recipe["id"]}`;
  div.setAttribute("id", id);

  const h2 = document.createElement("h2");
  h2.innerText = recipe["title"];

  const h3 = document.createElement("h3");
  h3.innerText = recipe["time"];
  const h4 = document.createElement("h4");
  h4.innerText = recipe["steps"];
  const image = document.createElement("img");
  image.src = recipe["image"];

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "delete";
  deleteBtn.addEventListener("click", function () {
    removerecipe(recipe["id"]);
  });

  div.appendChild(h2);
  div.appendChild(h3);
  div.appendChild(h4);
  div.appendChild(image);
  div.appendChild(deleteBtn);

  return div;
}

function removerecipe(recipeId) {
  const filteredArray = favrecipe.filter((recipe) => recipe.id != recipeId);
  favrecipe = filteredArray;
  updaterecipeListUI();
  saveToLocalStorage();
}

function clearApp() {
  const app = document.querySelector("#app");
  app.innerHTML = "";
}

function hookForm() {
  const form = document.querySelector("#add-recipe-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.querySelector("#recipe-title").value;
    const recipetime = document.querySelector("#recipe-time").value;

    const steps = document.querySelector("#recipe-step").value;
    const image = document.querySelector("#recipe-image").value;

    const recipe = {
      id: new Date().getTime(),
      title: name,
      time: recipetime,
      steps: steps,
      image: image,
    };
    addrecipe(recipe);
  });
}
function addrecipe(recipe) {
  favrecipe.push(recipe);
  updaterecipeListUI();
  saveToLocalStorage();
}
function saveToLocalStorage() {
  const str = JSON.stringify(favrecipe);
  localStorage.setItem("recipe list", str);
}
function getFromLocalStorage() {
  const str = localStorage.getItem("recipe list");
  if (!str) {
    favrecipe = [];
  } else {
    favrecipe = JSON.parse(str);
  }
}
getFromLocalStorage();
updaterecipeListUI();
hookForm();
