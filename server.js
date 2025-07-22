const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// serve static files
app.use(express.static(__dirname));

function readSongs(file) {
  return fs.readFileSync(path.join(__dirname, file), 'utf8')
    .split(/\r?\n/)
    .filter(Boolean);
}

app.get('/api/songs/tvgirl', (req, res) => {
  try {
    res.json({ songs: readSongs('tvgirl_songs.txt') });
  } catch (err) {
    res.status(500).json({ error: 'Cannot read songs' });
  }
});

app.get('/api/songs/smiths', (req, res) => {
  try {
    res.json({ songs: readSongs('smiths_songs.txt') });
  } catch (err) {
    res.status(500).json({ error: 'Cannot read songs' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
