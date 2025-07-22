async function loadSongs(endpoint, containerId) {
  try {
    const res = await fetch(endpoint);
    const data = await res.json();
    const container = document.getElementById(containerId);
    data.songs.forEach(song => {
      const div = document.createElement('div');
      div.className = 'song-item';
      div.innerHTML = `<a href="#" class="song-link">${song}</a>`;
      container.appendChild(div);
    });
  } catch (err) {
    console.error('Failed to load songs', err);
  }
}

loadSongs('/api/songs/tvgirl', 'tv-girl-songs');
loadSongs('/api/songs/smiths', 'smiths-songs');
