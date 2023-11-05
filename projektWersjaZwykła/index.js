const genreSelect = document.getElementById("genreSelect");
const tempoSelect = document.getElementById("tempoSelect");
const searchInput = document.getElementById("searchInput");
const songsTable = document
  .getElementById("songsTable")
  .getElementsByTagName("tbody")[0];

let songs = [];
let favorites = new Set();

async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}

async function setupGenres() {
  const genres = await fetchData(
    "https://gist.githubusercontent.com/techniadrian/6ccdb1c837d431bb84c2dfedbec2e435/raw/60783ebfa89c6fd658aaf556b9f7162553ac0729/genres.json"
  );
  genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre.id;
    option.innerText = genre.name;
    genreSelect.appendChild(option);
  });
}

function renderSongs(filteredSongs) {
  songsTable.innerHTML = "";
  filteredSongs.forEach((song) => {
    const row = songsTable.insertRow();
    row.insertCell(0).innerText = song.artist;
    row.insertCell(1).innerText = song.title;
    row.insertCell(2).innerText = song.genre;
    row.insertCell(3).innerText = song.bpm;
    row.insertCell(4).innerText = song.length;

    const favoriteCell = row.insertCell(5);
    const favoriteBtn = document.createElement("button");
    favoriteBtn.innerHTML = favorites.has(song.id) ? "❤️" : "🤍";
    favoriteBtn.onclick = () => toggleFavorite(song.id, favoriteBtn);
    favoriteCell.appendChild(favoriteBtn);
  });
}

function toggleFavorite(songId, btn) {
  if (favorites.has(songId)) {
    favorites.delete(songId);
    btn.innerHTML = "🤍";
  } else {
    favorites.add(songId);
    btn.innerHTML = "❤️";
  }
}

function filterSongs() {
  let filteredSongs = songs.slice();

  const selectedGenre = genreSelect.value;
  const selectedTempo = tempoSelect.value;
  const searchPhrase = searchInput.value.toLowerCase();

  if (selectedGenre !== "all") {
    filteredSongs = filteredSongs.filter(
      (song) => song.genre === selectedGenre
    );
  }

  if (selectedTempo === "slow") {
    filteredSongs = filteredSongs.filter((song) => song.bpm < 110);
  } else if (selectedTempo === "medium") {
    filteredSongs = filteredSongs.filter(
      (song) => song.bpm >= 110 && song.bpm <= 130
    );
  } else if (selectedTempo === "fast") {
    filteredSongs = filteredSongs.filter((song) => song.bpm > 130);
  }

  if (searchPhrase) {
    filteredSongs = filteredSongs.filter(
      (song) =>
        song.title.toLowerCase().includes(searchPhrase) ||
        song.artist.toLowerCase().includes(searchPhrase)
    );
  }

  renderSongs(filteredSongs);
}

async function init() {
  await setupGenres();
  songs = await fetchData(
    "https://gist.githubusercontent.com/techniadrian/c39f844edbacee0439bfeb107227325b/raw/81eec7847b1b3dfa1c7031586405c93e9a9c1a2d/songs.json"
  );
  renderSongs(songs);

  genreSelect.addEventListener("change", filterSongs);
  tempoSelect.addEventListener("change", filterSongs);
  searchInput.addEventListener("input", filterSongs);
}

init();
