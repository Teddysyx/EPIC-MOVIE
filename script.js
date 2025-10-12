const m3uUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://pastebin.com/raw/zKSiSwfd');

let allChannels = [];

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

function playChannel(streamUrl, channelName) {
    const videoPlayer = document.getElementById('video-player');
    const video = document.getElementById('video');
    
    videoPlayer.className = 'video-player-visible';
    
    setTimeout(() => {
        video.src = streamUrl;
        video.load();
        
        video.play().catch(error => {
            alert(`Nelze přehrát: ${channelName}`);
        });
    }, 300);
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