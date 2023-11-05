import React from "react";

const SongTable = ({ songs, toggleFavorite, favorites }) => {
  return (
    <table id="songsTable">
      <thead>
        <tr>
          <th>Artysta</th>
          <th>Tytuł</th>
          <th>Gatunek</th>
          <th>Tempo (bpm)</th>
          <th>Długość</th>
          <th>Ulubione</th>
        </tr>
      </thead>
      <tbody>
        {songs.map((song) => (
          <tr key={song.id}>
            <td>{song.artist}</td>
            <td>{song.title}</td>
            <td>{song.genre}</td>
            <td>{song.bpm}</td>
            <td>{song.length}</td>
            <td>
              <button onClick={() => toggleFavorite(song.id)}>
                {favorites.has(song.id) ? "❤️" : "🤍"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SongTable;
