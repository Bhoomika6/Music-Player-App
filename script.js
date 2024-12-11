const songs = [
  {
    id: 1,
    name: "Shape Of You",
    artist: "Ed Sheeran",
    img: "https://i.ytimg.com/vi/JGwWNGJdvx8/sddefault.jpg",
    genre: "pop",
    source: "audios/John Gold - Lost In My Mind (Original Mix.mp3",
  },
  {
    id: 2,
    name: "All Of Me",
    artist: "Adele",
    img: "https://i.ytimg.com/vi/450p7goxZqg/maxresdefault.jpg",
    genre: "pop",
    source: "audios/John Gold - Lost In My Mind (Original Mix.mp3",
  },
  {
    id: 3,
    name: "Somelike Like You",
    artist: "Adele",
    img: "https://i.insider.com/6197d4a5432ef900197ce8e0?width=700",
    genre: "pop",
    source: "audios/John Gold - Lost In My Mind (Original Mix.mp3",
  },
  {
    id: 4,
    name: "Wonderwall",
    artist: "Oasis",
    img: "https://i1.sndcdn.com/artworks-000221645896-kwggra-t500x500.jpg",
    genre: "rock",
    source: "audios/John Gold - Lost In My Mind (Original Mix.mp3",
  },
  {
    id: 5,
    name: "Sugar",
    artist: "Maroon 5",
    img: "https://i.ytimg.com/vi/09R8_2nJtjg/maxresdefault.jpg",
    genre: "pop",
    source: "audios/John Gold - Lost In My Mind (Original Mix.mp3",
  },
  {
    id: 6,
    name: "Locked Away",
    artist: "R. City",
    img: "locked_away.jpg",
    genre: "hiphop",
    source: "audios/John Gold - Lost In My Mind (Original Mix.mp3",
  },
  // Add more songs as needed
  {
    id: 7,
    name: "Fall in Love Alone",
    artist: "Isha",
    img: "audios/isha-spotify.png",
    genre: "pop",
    source: "audios/John Gold - Lost In My Mind (Original Mix.mp3",
  },
];

const playlists = {};

document.addEventListener("DOMContentLoaded", () => {
  const genreSelect = document.getElementById("genre");
  const songsList = document.getElementById("songs");
  const cover = document.getElementById("cover");
  const title = document.getElementById("title");
  const artist = document.getElementById("artist");
  const audio = document.getElementById("audio");
  const playButton = document.getElementById("play");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const addToPlaylistButton = document.getElementById("add-to-playlist");
  const createPlaylistButton = document.getElementById("create-playlist");
  const playlistNameInput = document.getElementById("playlist-name");
  const currentPlaylist = document.getElementById("current-playlist");
  const allPlaylists = document.getElementById("all-playlists");
  const toggleThemeButton = document.getElementById("flexSwitchCheckDefault");
  const toggleLabel = document.getElementById("flexSwitchCheckDefault-label");

  // getElementById("flexSwitchCheckDefault").addEventListener("click", () => {
  //   if (
  //     getElementById("flexSwitchCheckDefault - label").textContent === "Dark"
  //   ) {
  //     getElementById("flexSwitchCheckDefault - label").textContent = "Light";
  //   }

  //   else {
  //     getElementById("flexSwitchCheckDefault - label").textContent = "Light";
  //   }
  // });

  let currentSongIndex = 0;

  const renderSongs = (genre = "all") => {
    songsList.innerHTML = "";
    const filteredSongs =
      genre === "all" ? songs : songs.filter((song) => song.genre === genre);
    filteredSongs.forEach((song) => {
      const li = document.createElement("li");
      li.textContent = `${song.name} - ${song.artist}`;
      li.addEventListener("click", () => playSong(song.id));
      songsList.appendChild(li);
    });
  };

  const renderCurrentSong = () => {
    const song = songs[currentSongIndex];
    cover.src = song.img;
    title.textContent = song.name;
    artist.textContent = song.artist;
    audio.src = song.source;
  };

  const playSong = (id) => {
    currentSongIndex = songs.findIndex((song) => song.id === id);
    renderCurrentSong();
    audio.play();
  };

  playButton.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playButton.textContent = "Pause";
    } else {
      audio.pause();
      playButton.textContent = "Play";
    }
  });

  prevButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    renderCurrentSong();
    audio.play();
  });

  nextButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    renderCurrentSong();
    audio.play();
  });

  addToPlaylistButton.addEventListener("click", () => {
    const playlistName = prompt("Enter playlist name:");
    // if (playlistName) {
    if (!playlists[playlistName]) {
      playlists[playlistName] = [];
    }
    playlists[playlistName].push(songs[currentSongIndex]);
    renderPlaylists();
    // }
  });

  createPlaylistButton.addEventListener("click", () => {
    const playlistName = playlistNameInput.value.trim();
    if (playlistName && !playlists[playlistName]) {
      playlists[playlistName] = [];
      renderPlaylists();
      playlistNameInput.value = "";
    }
  });

  const renderPlaylists = () => {
    currentPlaylist.innerHTML = "";
    allPlaylists.innerHTML = "";
    for (const [playlistName, songs] of Object.entries(playlists)) {
      const li = document.createElement("li");
      li.textContent = playlistName;
      li.addEventListener("click", () => renderPlaylistSongs(playlistName));
      allPlaylists.appendChild(li);
    }
  };

  const renderPlaylistSongs = (playlistName) => {
    currentPlaylist.innerHTML = "";
    playlists[playlistName].forEach((song) => {
      const li = document.createElement("li");
      li.textContent = `${song.name} - ${song.artist}`;
      li.addEventListener("click", () => playSong(song.id));
      currentPlaylist.appendChild(li);
    });
  };

  genreSelect.addEventListener("change", () => {
    renderSongs(genreSelect.value);
  });

  toggleThemeButton.addEventListener("click", () => {
    if (toggleLabel.textContent === "Dark") {
      toggleLabel.textContent = "Light";
    } else {
      toggleLabel.textContent = "Dark";
    }
    console.log(toggleLabel.textContent);
    const currentTheme = document.body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", newTheme);
  });

  renderSongs();
  renderPlaylists();
  renderCurrentSong();
});
