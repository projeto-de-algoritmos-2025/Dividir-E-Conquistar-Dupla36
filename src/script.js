import {INITIAL_DB_DATA} from "./initialData.js";

const API_KEY = "69652562";
const BASE_URL = "https://www.omdbapi.com/";
const resultsDiv = document.getElementById("results");
const userListUL = document.getElementById("userList");
const userNameInput = document.getElementById("userName");
const listOwnerSpan = document.getElementById("listOwner");
const recommendBtn = document.getElementById("recommendBtn");
const recommendationResult = document.getElementById("recommendationResult");

// banco de dados simulado
let currentUserPrefs = [];
let allUserData = {};

// inicia o BD
function initDatabase() {
  const dataFromStorage = localStorage.getItem("movieRecsDB");
  if (dataFromStorage) {
    allUserData = JSON.parse(dataFromStorage);
  } else {
    // Se for a primeira vez, cria um usuário fake
    allUserData = INITIAL_DB_DATA;
    saveToStorage();
  }
}

// salva o BD no local storage
function saveToStorage() {
  localStorage.setItem("movieRecsDB", JSON.stringify(allUserData));
}

// salva a lista do usuário ativo no BD
document.getElementById("saveBtn").addEventListener("click", () => {
  const userName = userNameInput.value.trim();
  if (!userName) {
    alert("Por favor, digite seu nome para salvar a lista.");
    return;
  }
  if (currentUserPrefs.length === 0) {
    alert("Sua lista está vazia. Adicione alguns filmes.");
    return;
  }

  allUserData[userName] = currentUserPrefs;
  saveToStorage();
  alert("Sua lista foi salva!");
});

// carrega a lista do usuário
document.getElementById("loadBtn").addEventListener("click", () => {
  const userName = userNameInput.value.trim();
  if (!userName) {
    alert("Por favor, digite seu nome para carregar sua lista.");
    return;
  }

  if (allUserData[userName]) {
    currentUserPrefs = allUserData[userName].slice(); 
    listOwnerSpan.textContent = userName;
    renderList();
    recommendationResult.textContent = ""; 
  } else {
    alert("Nenhuma lista encontrada para este nome. Crie a sua e salve!");
    currentUserPrefs = [];
    listOwnerSpan.textContent = userName;
    renderList();
  }
});

// busca
document.getElementById("searchBtn").addEventListener("click", async () => {
  const query = document.getElementById("searchInput").value;
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`);
  const data = await res.json();
  if (data.Search) {
    showResults(data.Search);
  } else {
    resultsDiv.innerHTML = "<p>Nenhum filme encontrado.</p>";
  }
});

function showResults(movies) {
  resultsDiv.innerHTML = "";

  movies.forEach(m => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    const img = document.createElement("img");

    img.src = m.Poster !== "N/A" ? m.Poster : "../assets/no-img.png";
    img.alt = m.Title;

    img.onerror = () => {
      img.src = "../assets/no-img.png";
    };

    const title = document.createElement("p");
    title.classList.add("movie-title");
    title.textContent = m.Title;

    card.onclick = () => addToList(m.Title);

    card.appendChild(img);
    card.appendChild(title);

    resultsDiv.appendChild(card);
  });
}

// lista de Preferências do Usuário
function addToList(title) {
  // Se já existe, remove para adicionar no topo
  if (currentUserPrefs.includes(title)) {
    currentUserPrefs = currentUserPrefs.filter(item => item !== title);
  }
  currentUserPrefs.unshift(title); // Adiciona no início (maior preferência)
  renderList();
}

function renderList() {
  userListUL.innerHTML = "";
  
  if (currentUserPrefs.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Sua lista está vazia. Comece a buscar!";
    li.classList.add("empty-list-message");
    userListUL.appendChild(li);
    return;
  }
  
  currentUserPrefs.forEach((t, i) => {
    const li = document.createElement("li");
    
    const textSpan = document.createElement("span");
    textSpan.textContent = `${i + 1}. ${t}`;
    
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete-btn');
    
    deleteBtn.onclick = (event) => {
      event.stopPropagation(); 
      removeFromList(t);
    };

    li.appendChild(textSpan);
    li.appendChild(deleteBtn);
    userListUL.appendChild(li);
  });
}

// lógica de Recomendação
recommendBtn.addEventListener("click", () => {
  const currentUser = userNameInput.value.trim();
  if (!currentUser || currentUserPrefs.length < 2) {
    recommendationResult.textContent =
      "Você precisa ter uma lista com pelo menos 2 filmes e ter digitado seu nome para receber recomendações.";
    return;
  }

  const recommendations = findRecommendations(currentUser);
  
  if (recommendations.length > 0) {
    recommendationResult.textContent = 
        `Encontramos usuários com gostos parecidos! \n\nRecomendações para você:\n- ${recommendations.join('\n- ')}`;
  } else {
    recommendationResult.textContent = "Não encontramos nenhuma recomendação nova com base nos usuários atuais. Tente adicionar mais filmes à sua lista.";
  }
});

// encontra recomendações baseadas em usuários similares
function findRecommendations(currentUser) {
  const userA_list = currentUserPrefs;
  let bestMatch = { name: null, similarity: -1 };

  for (const otherUser in allUserData) {
    if (otherUser === currentUser) continue; 

    const userB_list = allUserData[otherUser];

    const { inversions, commonMovies } = calculateInversions(userA_list, userB_list);

    if (commonMovies.length < 2) continue; 
    const n = commonMovies.length;
    const maxInversions = (n * (n - 1)) / 2;
    const similarity = maxInversions === 0 ? 100 : ((maxInversions - inversions) / maxInversions) * 100;

    console.log(`Comparando com ${otherUser}: Similaridade de ${similarity.toFixed(0)}%`);

    if (similarity > bestMatch.similarity) {
      bestMatch = { name: otherUser, similarity: similarity };
    }
  }

  if (bestMatch.name && bestMatch.similarity > 40) {
    console.log(`Seu "vizinho mais próximo" é: ${bestMatch.name}`);
    
    const bestMatchList = allUserData[bestMatch.name];
    
    const recommendations = bestMatchList.filter(movie => !userA_list.includes(movie));
    
    return recommendations;
  }

  return []; // Não encontrou recomendações
}

function calculateInversions(listA, listB) {
  const commonMovies = listA.filter(movie => listB.includes(movie));
  const listA_common = listA.filter(movie => commonMovies.includes(movie));
  const listB_common = listB.filter(movie => commonMovies.includes(movie));

  const rankMapA = new Map();
  listA_common.forEach((movie, index) => {
    rankMapA.set(movie, index);
  });

  const ranksB = listB_common.map(movie => rankMapA.get(movie));

  const { inversions } = countInversionsOptimized(ranksB);

  return { inversions, commonMovies };
}

function countInversionsOptimized(arr) {
  if (arr.length <= 1) return { inversions: 0, sorted: arr };

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  const leftResult = countInversionsOptimized(left);
  const rightResult = countInversionsOptimized(right);
  const mergeResult = mergeAndCount(leftResult.sorted, rightResult.sorted);

  const totalInversions =
    leftResult.inversions + rightResult.inversions + mergeResult.inversions;

  return { inversions: totalInversions, sorted: mergeResult.sorted };
}

function mergeAndCount(left, right) {
  let i = 0, j = 0, inversions = 0;
  const sorted = [];

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      sorted.push(left[i++]);
    } else {
      sorted.push(right[j++]);
      inversions += left.length - i;
    }
  }

  return {
    inversions,
    sorted: [...sorted, ...left.slice(i), ...right.slice(j)]
  };
}

const introScreen = document.getElementById("introScreen");
const startBtn = document.getElementById("startBtn");
const mainContent = document.getElementById("mainContent");

startBtn.addEventListener("click", () => {
    console.log("clicou");
    introScreen.style.display = 'none';
    mainContent.style.display = 'block'; 
});

function removeFromList(title) {
  currentUserPrefs = currentUserPrefs.filter(item => item !== title);
  
  renderList();

  const userName = userNameInput.value.trim();
  if (userName) {
    allUserData[userName] = currentUserPrefs;
    saveToStorage();
    alert(`"${title}" removido e lista salva!`);
  }
}



initDatabase();