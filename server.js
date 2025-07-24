const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Use express-ejs-layouts to allow a single layout template
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layout');

// Configure view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static assets from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Helper to read songs from a text file
function readSongs(fileName) {
  const content = fs.readFileSync(path.join(__dirname, fileName), 'utf8');
  return content.split(/\r?\n/).filter(Boolean);
}

// Home route
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home',
    active: '',
    sidebar: null
  });
});

// Wiki page
app.get('/wiki', (req, res) => {
  res.render('wiki', {
    title: 'Wiki',
    active: 'wiki'
  });
});

// Forum page
app.get('/forum', (req, res) => {
  res.render('forum', {
    title: 'Forum',
    active: 'forum'
  });
});

// Files page listing downloads
app.get('/files', (req, res) => {
  const fileNames = ['tvgirl_songs.txt', 'smiths_songs.txt'];
  const files = fileNames.map(name => {
    const stat = fs.statSync(path.join(__dirname, name));
    return { name, size: stat.size };
  });
  res.render('files', {
    title: 'Files',
    active: 'files',
    files
  });
});

// Download individual file
app.get('/download/:file', (req, res) => {
  const safeName = path.basename(req.params.file);
  const filePath = path.join(__dirname, safeName);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }
  res.download(filePath);
});

// API endpoints for songs
app.get('/api/songs/tvgirl', (req, res) => {
  res.json({ songs: readSongs('tvgirl_songs.txt') });
});

app.get('/api/songs/smiths', (req, res) => {
  res.json({ songs: readSongs('smiths_songs.txt') });
});

// Start server if run directly
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Improved TVT app listening on http://localhost:${PORT}`);
  });
}

module.exports = app;
