const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEle = document.getElementById("current-time");
const durationEle = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Music
const songs = [
    {
        name: "The-Night-We-Met",
        displayName: "The Night We Met",
        artist: "Lord Huron",
    },
    {
        name: "EndOfBeginning",
        displayName: "End Of Beginning",
        artist: "Djo",
    },
    {
        name: "Teanage-Monalisa",
        displayName: "Teanage Monalisa",
        artist: "Alfie Oastley",
    },
    {
        name: "Glimpse Of Us",
        displayName: "Glimpse Of Us",
        artist: "Joji",
    },
    {
        name: "Slow Dancing In The Dark",
        displayName: "Slow Dancing In The Dark",
        artist: "Joji",
    },
    {
        name: "December",
        displayName: "December",
        artist: "Neck Deep",
    },
    {
        name: "Sanctuary",
        displayName: "Sanctuary",
        artist: "Joji",
    },
    {
        name: "Line Without A Hook",
        displayName: "Line Without A Hook",
        artist: "Ricky Montgomery",
    },
    {
        name: "Drunk Text",
        displayName: "Drunk Text",
        artist: "Henry Moodie",
    },
    {
        name: "rapsodi",
        displayName: "Rapsodi",
        artist: "JKT48",
    },
    {
        name: "afterlife",
        displayName: "Afterlife",
        artist: "Avenged Sevenfold",
    },
    

];

// Check if playing
let isPlaying = false;

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// On load: Select first song randomly
let songIndex = Math.floor(Math.random() * songs.length);
loadSong(songs[songIndex]);

// Set Song Duration when it's possible to play a song
function setSongDuration(e) {
    const totalSeconds = Math.floor(e.target.duration);
    const durationMinutes = Math.floor(totalSeconds / 60);
    let durationSeconds = totalSeconds % 60;
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }
    durationEle.textContent = `${durationMinutes}:${durationSeconds}`;
}

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
    music.pause();
}

// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    progress.style.width = `0%`;
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    progress.style.width = `0%`;
    playSong();
}

// Display progress bar width and calculate display for current time function
function barWidthAndCurrentTime() {
    const { duration, currentTime } = music;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEle.textContent = `${currentMinutes}:${currentSeconds}`;
}

// Update Progress Bar & Time while playing
function updateProgressBar() {
    if (isPlaying) {
        barWidthAndCurrentTime();
    }
}

// Set Progress Bar and current time if and if not playing when user clicks on progress bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
    if (!isPlaying) {
        barWidthAndCurrentTime();
    }
}

// Event Listeners
music.addEventListener("canplay", setSongDuration);
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgressBar);

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
  }
  