const m3uUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://pastebin.com/raw/zKSiSwfd');

let allChannels = [];
let controlsTimeout;

async function loadPlaylist() {
    try {
        const movieContainer = document.getElementById('movie-container');
        movieContainer.innerHTML = '<div class="loading">Načítám filmy...</div>';

        const response = await fetch(m3uUrl);
        
        if (!response.ok) {
            throw new Error('Chyba při načítání dat');
        }
        
        const m3uText = await response.text();
        
        if (!m3uText.includes('#EXTINF:')) {
            throw new Error('Neplatný formát M3U souboru');
        }
        
        allChannels = parseM3U(m3uText);
        
        if (allChannels.length === 0) {
            throw new Error('Žádné filmy nenalezeny');
        }
        
        displayMovies(allChannels);
        setupSearch();
    } catch (error) {
        const movieContainer = document.getElementById('movie-container');
        movieContainer.innerHTML = '<div class="loading">Nepodařilo se načíst filmy</div>';
    }
}

function parseM3U(m3uText) {
    const channels = [];
    const lines = m3uText.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line.startsWith('#EXTINF:')) {
            const infoLine = line;
            const urlLine = lines[i + 1] ? lines[i + 1].trim() : '';
            
            const nameMatch = infoLine.match(/tvg-name="([^"]*)"/);
            const logoMatch = infoLine.match(/tvg-logo="([^"]*)"/);
            
            const name = nameMatch ? nameMatch[1] : infoLine.split(',').pop() || 'Neznámý film';
            const logo = logoMatch ? logoMatch[1] : 'https://via.placeholder.com/200x300/333333/666666?text=EPIC+MOVIE';
            
            if (urlLine && !urlLine.startsWith('#') && urlLine !== '') {
                channels.push({
                    name: name,
                    logo: logo,
                    url: urlLine
                });
            }
        }
    }
    return channels;
}

function displayMovies(channels) {
    const movieContainer = document.getElementById('movie-container');
    movieContainer.innerHTML = '';

    channels.forEach(channel => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie-item';
        movieElement.innerHTML = `
            <img src="${channel.logo}" alt="${channel.name}" class="movie-poster" 
                 onerror="this.src='https://via.placeholder.com/200x300/333333/666666?text=EPIC+MOVIE'">
        `;
        
        movieElement.addEventListener('click', () => playChannel(channel.url, channel.name));
        movieContainer.appendChild(movieElement);
    });
}

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            displayMovies(allChannels);
            return;
        }
        
        const filteredChannels = allChannels.filter(channel => 
            channel.name.toLowerCase().includes(searchTerm)
        );
        
        if (filteredChannels.length === 0) {
            const movieContainer = document.getElementById('movie-container');
            movieContainer.innerHTML = '<div class="no-results">Nenalezeny žádné filmy</div>';
        } else {
            displayMovies(filteredChannels);
        }
    });
}

function playChannel(streamUrl, channelName) {
    const videoPlayer = document.getElementById('video-player');
    const video = document.getElementById('video');
    
    videoPlayer.className = 'video-player-visible';
    video.src = streamUrl;
    setupCustomControls();
    
    video.play().catch(error => {
        alert(`Nelze přehrát: ${channelName}`);
    });
}

function setupCustomControls() {
    const video = document.getElementById('video');
    const videoWrapper = document.querySelector('.video-wrapper');
    const customControls = document.querySelector('.custom-controls');
    const playPauseBtn = document.querySelector('.play-pause');
    const progressBar = document.querySelector('.progress');
    const progressContainer = document.querySelector('.progress-bar');
    const timeDisplay = document.querySelector('.time');
    const volumeBtn = document.querySelector('.volume-btn');
    const speedBtn = document.querySelector('.speed-btn');
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    const closePlayerBtn = document.querySelector('.close-player-btn');

    // Funkce pro zobrazení ovládacích prvků
    function showControls() {
        customControls.style.opacity = '1';
        clearTimeout(controlsTimeout);
        controlsTimeout = setTimeout(() => {
            if (!video.paused) {
                customControls.style.opacity = '0';
            }
        }, 3000);
    }

    // Události pro zobrazení ovládacích prvků
    videoWrapper.addEventListener('mousemove', showControls);
    videoWrapper.addEventListener('mouseleave', () => {
        if (!video.paused) {
            controlsTimeout = setTimeout(() => {
                customControls.style.opacity = '0';
            }, 1000);
        }
    });

    // Play/Pause
    playPauseBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playPauseBtn.textContent = '⏸️';
        } else {
            video.pause();
            playPauseBtn.textContent = '▶';
        }
        showControls();
    });

    // Progress bar
    progressContainer.addEventListener('click', (e) => {
        const rect = progressContainer.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        video.currentTime = pos * video.duration;
        showControls();
    });

    video.addEventListener('timeupdate', () => {
        const progress = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${progress}%`;
        
        const currentTime = formatTime(video.currentTime);
        const duration = formatTime(video.duration);
        timeDisplay.textContent = `${currentTime} / ${duration}`;
    });

    // Volume
    volumeBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        volumeBtn.textContent = video.muted ? '🔇' : '🔊';
        showControls();
    });

    // Playback speed
    let speedIndex = 0;
    const speeds = [0.5, 1, 1.5, 2];
    speedBtn.addEventListener('click', () => {
        speedIndex = (speedIndex + 1) % speeds.length;
        video.playbackRate = speeds[speedIndex];
        speedBtn.textContent = `Rychlost (${speeds[speedIndex]}x)`;
        showControls();
    });

    // Fullscreen
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            videoWrapper.requestFullscreen().catch(err => {
                console.log(`Chyba při zapnutí fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
        showControls();
    });

    // Close player
    closePlayerBtn.addEventListener('click', hidePlayer);

    // Video ended
    video.addEventListener('ended', () => {
        playPauseBtn.textContent = '▶';
        showControls();
    });

    // Klávesové zkratky
    videoWrapper.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
            e.preventDefault();
            if (video.paused) {
                video.play();
                playPauseBtn.textContent = '⏸️';
            } else {
                video.pause();
                playPauseBtn.textContent = '▶';
            }
        } else if (e.key === 'f' || e.key === 'F') {
            if (!document.fullscreenElement) {
                videoWrapper.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        } else if (e.key === 'Escape') {
            hidePlayer();
        }
    });

    // Ujistíme se, že video wrapper může přijímat klávesové události
    videoWrapper.setAttribute('tabindex', '0');
    videoWrapper.focus();
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

function hidePlayer() {
    const videoPlayer = document.getElementById('video-player');
    const video = document.getElementById('video');
    
    video.pause();
    video.src = '';
    videoPlayer.className = 'video-player-hidden';
}

document.addEventListener('DOMContentLoaded', loadPlaylist);

document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
        hidePlayer();
    }
});

const playBtn = document.querySelector('.play-btn');
playBtn.addEventListener('click', () => {
    if (allChannels.length > 0) {
        playChannel(allChannels[0].url, allChannels[0].name);
    }
});