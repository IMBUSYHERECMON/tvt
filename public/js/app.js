// Wait until the DOM has fully loaded before manipulating elements.
document.addEventListener('DOMContentLoaded', () => {
  /**
   * Audio player setup
   */
  const audioPlayer = document.getElementById('audio-player');
  const nowPlaying = document.getElementById('now-playing');
  const playBtn = document.getElementById('play-btn');
  const nextBtn = document.getElementById('next-btn');
  const muteBtn = document.getElementById('mute-btn');

  // List of tracks available for the background music player.  Each track
  // contains a source URL and a human‑friendly title.
  const tracks = [
    {
      src: 'https://archive.org/download/TVGirl-TourTape2012/LovingMachine.mp3',
      title: 'Loving Machine – TV Girl'
    },
    {
      src: 'https://archive.org/download/TheSmithsBackToTheOldHouse_201909/Back%20to%20the%20Old%20House.mp3',
      title: 'Back to the Old House – The Smiths'
    }
  ];
  let currentTrack = 0;

  /**
   * Load a track into the HTML5 audio element and update the track title.
   *
   * @param {number} index Index into the `tracks` array.
   */
  function loadTrack(index) {
    const track = tracks[index];
    audioPlayer.src = track.src;
    nowPlaying.textContent = track.title;
  }

  /**
   * Toggle between playing and pausing the current track.  Updates the
   * displayed icon accordingly.
   */
  function togglePlay() {
    if (audioPlayer.paused) {
      audioPlayer.play();
      playBtn.textContent = '⏸️';
    } else {
      audioPlayer.pause();
      playBtn.textContent = '▶️';
    }
  }

  /**
   * Advance to the next track in the list.  Loops back to the first
   * track when reaching the end.
   */
  function nextTrack() {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    if (!audioPlayer.paused) {
      audioPlayer.play();
    }
  }

  /**
   * Mute or unmute the audio player.  Updates the button icon.
   */
  function toggleMute() {
    audioPlayer.muted = !audioPlayer.muted;
    muteBtn.textContent = audioPlayer.muted ? '🔇' : '🔊';
  }

  // Attach event listeners if the controls exist on the page.
  if (playBtn) playBtn.addEventListener('click', togglePlay);
  if (nextBtn) nextBtn.addEventListener('click', nextTrack);
  if (muteBtn) muteBtn.addEventListener('click', toggleMute);

  // Auto‑advance the track when it finishes.
  audioPlayer.addEventListener('ended', nextTrack);

  // Initialize and begin playback (will silently fail if autoplay is prevented).
  loadTrack(currentTrack);
  audioPlayer.play().catch(() => {
    // If autoplay is blocked by the browser, set the play button to a play
    // icon so the user can start playback manually.
    playBtn.textContent = '▶️';
  });

  /**
   * Load a list of songs from a backend endpoint and append them to a
   * container element.  Song titles are displayed as plain text.
   *
   * @param {string} endpoint API endpoint to fetch from.
   * @param {string} containerId ID of the DOM element to populate.
   */
  async function loadSongs(endpoint, containerId) {
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      const container = document.getElementById(containerId);
      if (!container) return;
      data.songs.forEach(song => {
        const li = document.createElement('li');
        li.className = 'song-item';
        li.textContent = song;
        container.appendChild(li);
      });
    } catch (err) {
      console.error(`Failed to load songs from ${endpoint}`, err);
    }
  }

  // Conditionally load song lists if the containers exist in the DOM.  Pages
  // without these containers will simply skip this step.
  if (document.getElementById('tv-girl-songs')) {
    loadSongs('/api/songs/tvgirl', 'tv-girl-songs');
  }
  if (document.getElementById('smiths-songs')) {
    loadSongs('/api/songs/smiths', 'smiths-songs');
  }
});
