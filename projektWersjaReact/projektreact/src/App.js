// App.js
import React, { useState, useEffect } from "react";
import SongTable from "./components/SongTable";
import "./App.css";

const App = () => {
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedTempo, setSelectedTempo] = useState("all");
  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const songsResponse = await fetch(
        "https://gist.githubusercontent.com/techniadrian/c39f844edbacee0439bfeb107227325b/raw/81eec7847b1b3dfa1c7031586405c93e9a9c1a2d/songs.json"
      );
      const genresResponse = await fetch(
        "https://gist.githubusercontent.com/techniadrian/6ccdb1c837d431bb84c2dfedbec2e435/raw/60783ebfa89c6fd658aaf556b9f7162553ac0729/genres.json"
      );

      const songsData = await songsResponse.json();
      const genresData = await genresResponse.json();

      setSongs(songsData);
      setGenres(genresData);
    };

    fetchData();
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleTempoChange = (event) => {
    setSelectedTempo(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchPhrase(event.target.value.toLowerCase());
  };

  const getFilteredSongs = () => {
    return songs
      .filter((song) => selectedGenre === "all" || song.genre === selectedGenre)
      .filter((song) => {
        if (selectedTempo === "slow") return song.bpm < 110;
        if (selectedTempo === "medium")
          return song.bpm >= 110 && song.bpm <= 130;
        if (selectedTempo === "fast") return song.bpm > 130;
        return true;
      })
      .filter(
        (song) =>
          song.title.toLowerCase().includes(searchPhrase) ||
          song.artist.toLowerCase().includes(searchPhrase)
      );
  };

  return (
    <div className="App">
      <div className="filters">
        <select
          id="genreSelect"
          value={selectedGenre}
          onChange={handleGenreChange}
        >
          <option value="all">Wszystkie gatunki</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <select
          id="tempoSelect"
          value={selectedTempo}
          onChange={handleTempoChange}
        >
          <option value="all">każde tempo</option>
          <option value="slow">Wolne (&lt;110 bpm)</option>
          <option value="medium">Średnie (110-130 bpm)</option>
          <option value="fast">Szybkie (&gt;130 bpm)</option>
        </select>
        <input
          type="text"
          id="searchInput"
          placeholder="Wpisz frazę..."
          value={searchPhrase}
          onChange={handleSearchChange}
        />
      </div>

      <SongTable
        songs={getFilteredSongs()}
        toggleFavorite={toggleFavorite}
        favorites={favorites}
      />
    </div>
  );
};

export default App;
