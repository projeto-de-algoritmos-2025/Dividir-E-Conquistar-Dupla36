const API_KEY = "6afa5d1e";
const BASE_URL = "https://www.omdbapi.com/?i=tt3896198";
const resultsDiv = document.getElementById("results");
const userList = document.getElementById("userList");

let userPrefs = [];

document.getElementById("searchBtn").addEventListener("click", async () => {
  const query = document.getElementById("searchInput").value;
  const res = await fetch(`${BASE_URL}&apikey=${API_KEY}&s=${encodeURIComponent(query)}`);
  const data = await res.json();
  if (data.Search) {
    showResults(data.Search);
  } else {
    resultsDiv.innerHTML = "<p>Nenhum filme encontrado.</p>";
  }
});

// formatar os resultados na tela
function showResults(movies) {
  console.log(movies);
  resultsDiv.innerHTML = "";
  movies.forEach(m => {
    const img = document.createElement("img");  
    img.src = m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/150";
    img.title = m.Title;
    img.onclick = () => addToList(m.Title);

    // se o link da imagem quebrar, troca por imagem padrão
    //img.onerror = () => { -- não tá funcionando como esperado ainda
    //  img.src = "./../assets/no-image.png";
    // };

    resultsDiv.appendChild(img);
  });
}

function addToList(title) {
  if (!userPrefs.includes(title)) userPrefs.push(title);
  renderList();
}

function renderList() {
  userList.innerHTML = "";
  userPrefs.forEach((t, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${t}`;
    userList.appendChild(li);
  });
}
