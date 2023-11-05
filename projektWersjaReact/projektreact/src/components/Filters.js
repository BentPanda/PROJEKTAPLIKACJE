import React from "react";

const Filters = ({ onGenreChange, onTempoChange, onSearchChange }) => (
  <div className="filters">
    <select id="genreSelect" onChange={(e) => onGenreChange(e.target.value)}>
      {}
    </select>
    <select
      id="tempoSelect"
      defaultValue="all"
      onChange={(e) => onTempoChange(e.target.value)}
    >
      <option value="all">Wszystkie tempo</option>
      <option value="slow">Wolne (&lt;110 bpm)</option>
      <option value="medium">Średnie (110-130 bpm)</option>
      <option value="fast">Szybkie (&gt;130 bpm)</option>
    </select>
    <input
      type="text"
      id="searchInput"
      placeholder="Wpisz frazę..."
      onChange={(e) => onSearchChange(e.target.value)}
    />
    {}
  </div>
);

export default Filters;
