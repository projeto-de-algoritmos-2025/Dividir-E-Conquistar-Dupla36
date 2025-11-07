const API_KEY = "69652562";
const BASE_URL = "https://www.omdbapi.com/";
const resultsDiv = document.getElementById("results");
const userListUL = document.getElementById("userList");
const userNameInput = document.getElementById("userName");
const listOwnerSpan = document.getElementById("listOwner");
const recommendBtn = document.getElementById("recommendBtn");
const recommendationResult = document.getElementById("recommendationResult");

// Banco de dados simulado
let currentUserPrefs = [];
let allUserData = {};

// Inicia o BD
function initDatabase() {
  const dataFromStorage = localStorage.getItem("movieRecsDB");
  if (dataFromStorage) {
    allUserData = JSON.parse(dataFromStorage);
  } else {
    // Se for a primeira vez, cria um usuário fake
    allUserData = {
      "Bruno J.": [
        "Vingadores: Ultimato",
        "Homem-Aranha: Sem Volta Para Casa",
        "Pantera Negra",
        "Vingadores: Guerra Infinita",
        "Guardiões da Galáxia",
        "Logan"
      ],
      "Diana Y.": [
        "Batman: O Cavaleiro das Trevas",
        "Coringa",
        "O Esquadrão Suicida (2021)",
        "Mulher-Maravilha",
        "Watchmen: O Filme",
        "O Homem de Aço"
      ],
      "Miguel S.": [
        "Toy Story",
        "Divertida Mente",
        "Procurando Nemo",
        "Up - Altas Aventuras",
        "Soul",
        "Wall-E"
      ],
      "Isabella I.": [
        "O Rei Leão (1994)",
        "A Bela e a Fera (1991)",
        "Aladdin (1992)",
        "A Pequena Sereia (1989)",
        "Moana: Um Mar de Aventuras",
        "Enrolados"
      ],

      "Carlos E.": [
        "O Poderoso Chefão",
        "Laranja Mecânica",
        "2001: Uma Odisseia no Espaço",
        "Apocalypse Now",
        "Taxi Driver",
      ],

      "Sofia M.": [
        "Corra!",
        "Hereditário",
        "O Silêncio dos Inocentes",
        "Um Lugar Silencioso",
        "Psicose",
        "Parasita",
      ],

      "Leo W.": [
        "A Viagem de Chihiro",
        "Homem-Aranha no Aranhaverso",
        "O Senhor dos Anéis: O Retorno do Rei",
        "Wall-E",
        "O Castelo Animado",
      ],
      "Clara Q.": [
        "Casablanca",
        "O Poderoso Chefão",
        "...E o Vento Levou",
        "Cantando na Chuva",
        "Psicose",
        "Laranja Mecânica"
      ],
      "Ricardo N.": [
        "John Wick: De Volta ao Jogo",
        "Mad Max: Estrada da Fúria",
        "Missão: Impossível - Efeito Fallout",
        "Top Gun: Maverick",
        "Duro de Matar",
        "Gladiador"
      ],
      "Tiago E.": [
        "Duna (2021)",
        "Blade Runner 2049",
        "A Chegada",
        "Interestelar",
        "Matrix",
        "O Exterminador do Futuro 2"
      ],
      "Laura K.": [
        "Se Beber, Não Case!",
        "Superbad: É Hoje",
        "As Branquelas",
        "Minha Mãe é uma Peça",
        "Deadpool",
        "Debi & Lóide: Dois Idiotas em Apuros"
      ],
      "Amanda R.": [
        "Diário de uma Paixão",
        "10 Coisas que Eu Odeio em Você",
        "Questão de Tempo",
        "Como Eu Era Antes de Você",
        "Orgulho e Preconceito (2005)",
        "Simplesmente Acontece"
      ],
      "Pedro L.": [
        "O Senhor dos Anéis: A Sociedade do Anel",
        "Harry Potter e a Pedra Filosofal",
        "Piratas do Caribe: A Maldição do Pérola Negra",
        "Indiana Jones e os Caçadores da Arca Perdida",
        "Jurassic Park: O Parque dos Dinossauros",
        "Jumanji: Bem-vindo à Selva"
      ],
      "Kenji K.": [
        "Your Name",
        "Akira",
        "Perfect Blue",
        "A Viagem de Chihiro",
        "Jujutsu Kaisen 0: O Filme",
        "Ghost in the Shell (1995)"
      ],
      "Yuna Y.": [
        "Round 6",
        "Alquimia das Almas",
        "A Lição (The Glory)",
        "My Demon",
        "Sweet Home",
        "O Rei de Porcelana"
      ],
      "Mariana D.": [
        "Pretendente Surpresa",
        "O que Houve com a Secretária Kim?",
        "Sorriso Real",
        "Hometown Cha-Cha-Cha",
        "Aterrissagem Forçada no Amor",
        "O Rei de Porcelana"
      ],

      "Rodrigo S.": [
        "Round 6",
        "Alice in Borderland",
        "Sweet Home",
        "A Lição (The Glory)",
        "Kingdom",
        "Vagabond"
      ],

      "Camila Q.": [
        "Tudo Bem Não Ser Normal",
        "Goblin",
        "Rainha das Lágrimas",
        "Uma Advogada Extraordinária",
        "Vincenzo",
        "My Demon"
      ],
      
      "Akira W.": [
        "Alice in Borderland",
        "One Piece (Live Action)",
        "First Love (Hatsukoi)",
        "Hana Yori Dango",
        "Nodame Cantabile",
        "Midnight Diner: Tokyo Stories"
      ],

      "Mei K.": [
        "O Indomável (The Untamed)",
        "Jardim de Meteoros (2018)",
        "Love O2O",
        "Amor Eterno (Ten Miles of Peach Blossoms)",
        "Go Go Squid!",
        "Cinzas do Amor (Ashes of Love)"
      ],
      
      "Daniela S.": [
        "Descendentes do Sol",
        "Aterrissagem Forçada no Amor",
        "Vincenzo",
        "Alquimia das Almas",
        "Strong Woman Do Bong-soon",
        "Enquanto Você Dormia"
      ],
      "Helena A.": [
        "My Mister (O Meu Senhor)",
        "Signal (Sinal)",
        "Misaeng: Incomplete Life",
        "Stranger (Forest of Secrets)",
        "Sky Castle",
        "Prison Playbook"
      ],

      "Roberto L.": [
        "Reply 1988 (Responde 1988)",
        "Hospital Playlist (Diário de um Médico)",
        "Because This Is My First Life (Esta é Minha Primeira Vida)",
        "Navillera",
        "Our Beloved Summer (Nosso Eterno Verão)",
        "When the Weather Is Fine (Quando o Tempo Está Bom)"
      ],

      "Vanessa H.": [
        "The World of the Married (Mundo dos Casados)",
        "Penthouse: War in Life (Cobertura: Guerra na Vida)",
        "The Last Empress (A Última Imperatriz)",
        "Graceful Family (Família Graciosa)",
        "Secret Love (Amor Secreto)",
        "Eve (A Vingança de Eva)"
      ],

      "Eduardo J.": [
        "Nirvana in Fire (Nirvana em Fogo)",
        "Unnatural (Morte Não Natural)",
        "Someday or One Day (Um Dia)",
        "The Story of Minglan (A História de Minglan)",
        "Liar Game (Jogo da Mentira)",
        "Joy of Life (Alegria da Vida)"
      ],
      "Gabriela M.": [
        "Diário de uma Paixão",
        "Como Eu Era Antes de Você",
        "A Culpa é das Estrelas",
        "Titanic",
        "Um Dia",
        "PS: Eu Te Amo"
      ],

      "Lucas R.": [
        "Como Perder um Homem em 10 Dias",
        "De Repente 30",
        "O Casamento do Meu Melhor Amigo",
        "Uma Linda Mulher",
        "Sintonia de Amor",
        "Harry e Sally - Feitos Um para o Outro"
      ],

      "Leticia M.": [
        "Orgulho e Preconceito (2005)",
        "Bridgerton",
        "Desejo e Reparação",
        "Outlander",
        "Razão e Sensibilidade (1995)",
        "Adoráveis Mulheres (2019)"
      ],

      "Renan L.": [
        "Brilho Eterno de uma Mente sem Lembranças",
        "(500) Dias com Ela",
        "Questão de Tempo",
        "La La Land: Cantando Estações",
        "Ela (Her)",
        "Me Chame Pelo Seu Nome"
      ],

      "Sofia V.": [
        "Para Todos os Garotos que Já Amei",
        "A Barraca do Beijo",
        "Com Amor, Simon",
        "10 Coisas que Eu Odeio em Você",
        "Crepúsculo",
        "Trilogia Rua do Medo"
      ]
    }
    saveToStorage();
  }
}

// Salva o BD no localStorage
function saveToStorage() {
  localStorage.setItem("movieRecsDB", JSON.stringify(allUserData));
}

// Salva a lista do usuário ativo no BD
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

// Carrega a lista do usuário
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

// Busca
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
    const img = document.createElement("img");
    img.src = m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/150";
    img.title = m.Title;
    img.onclick = () => addToList(m.Title);
    resultsDiv.appendChild(img);
  });
}

// Lista de Preferências do Usuário
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
  currentUserPrefs.forEach((t, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${t}`;
    userListUL.appendChild(li);
  });
}

// Lógica de Recomendação
recommendBtn.addEventListener("click", () => {
  const currentUser = userNameInput.value.trim();
  if (!currentUser || currentUserPrefs.length < 2) {
    recommendationResult.textContent =
      "Você precisa ter uma lista com pelo menos 2 filmes (e ter digitado seu nome) para receber recomendações.";
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

// Encontra recomendações baseadas em usuários similares
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
  const inversions = countInversionsInArray(ranksB);

  return { inversions, commonMovies };
}
function countInversionsInArray(arr) {
  let inversions = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        inversions++;
      }
    }
  }
  return inversions;
}
initDatabase();