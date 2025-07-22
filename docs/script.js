const player = document.getElementById('player');
const tracks = [
  'https://archive.org/download/TVGirl-TourTape2012/LovingMachine.mp3',
  'https://archive.org/download/TheSmithsBackToTheOldHouse_201909/Back%20to%20the%20Old%20House.mp3'
];
let index = 0;

function playNext() {
  index = (index + 1) % tracks.length;
  player.src = tracks[index];
  player.play();
}

player.addEventListener('ended', playNext);
player.src = tracks[index];
player.play();

function loadSongs(url, listId) {
  fetch(url)
    .then(resp => resp.text())
    .then(text => {
      const list = document.getElementById(listId);
      text.split(/\n+/).forEach(song => {
        if (song.trim()) {
          const li = document.createElement('li');
          li.textContent = song.trim();
          list.appendChild(li);
        }
      });
    });
}

loadSongs('tvgirl_songs.txt', 'tv-girl-list');
loadSongs('smiths_songs.txt', 'smiths-list');

