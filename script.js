const m3uUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://pastebin.com/raw/zKSiSwfd');

let allChannels = [];

// Vašich 10 filmů
const featuredMovies = [
    {
        title: "Někdo to rád blond",
        background: "https://image.tmdb.org/t/p/original/8L7FEp6yY9E1qQODqx3H7ah9qxA.jpg",
        logo: "https://www.themoviedb.org/t/p/original/5z7b2SxNZnpN7iYQ8x8ZX6O3u9p.png",
        description: "Dva agenti FBI černé pleti mají ochránit dvě bílé holky z bohaté rodiny před únosem a nenapadne je nic lepšího, než se za ně prostě převléknout."
    },
    {
        title: "Adamsova rodina 2",
        background: "https://image.tmdb.org/t/p/original/sZhTfYouKM1iV3rVbgIVEQFQogA.jpg",
        logo: "https://image.tmdb.org/t/p/original/5zP0Em4MjK0m4ehOzqzMuMaBbMb.png",
        description: "Sourozenci Wednesday a Pugsley Addamsovi udělají všechno pro to, aby se zbavili nejmladšího brášky Puberta, kterého rodiče Gomez a Morticia zbožňují."
    },
    {
        title: "BATMAN",
        background: "https://image.tmdb.org/t/p/original/tRS6jvPM9qPrrnx2KRp3ew96Yot.jpg",
        logo: "https://static.wikia.nocookie.net/international-entertainment-project/images/b/bc/The_Batman_%282022%29_-_logo_%28English%29.png/revision/latest?cb=20230102195150",
        description: "Batman už druhým rokem bojuje proti zločinu a odhaluje korupci v Gothamu. Pronásleduje sériového vraha Riddlera, který se zaměřuje na místní smetánku."
    },
    {
        title: "Křižovatka smrti",
        background: "https://image.tmdb.org/t/p/original/qUOaR1ongf8sz9pZcL7ARrnpGKw.jpg",
        logo: "https://upload.wikimedia.org/wikipedia/commons/7/76/Rush_Hour_3_Logo.png",
        description: "Pokus o atentát pošle inspektora Leeho a detektiva Cartera do Paříže, aby chránili klíčového svědka, zatímco se snaží dostat gang Triády před spravedlnost."
    },
    {
        title: "Spider-Man 3",
        background: "https://image.tmdb.org/t/p/original/uPWkD0dZ4eyKIPY82HpbIipjSBb.jpg",
        logo: "https://image.tmdb.org/t/p/original/wcCvcacqg4TiiuI017RyGEPeenE.png",
        description: "Peter Parker od sebe odhání svoje nejbližší a bojuje s nepřáteli, zloduchy i tajemnou silou, která přidává temné odstíny jeho pavoučímu převleku."
    },
    {
        title: "Avengers: Endgame",
        background: "https://image.tmdb.org/t/p/original/h9q0ozwMWy7CK5U7FSZsMVtbsCQ.jpg",
        logo: "https://image.tmdb.org/t/p/original/pjZSBgMDYjEhyanp8aahfE1KcAn.png",
        description: "Čtvrtý díl ságy o Avengers je vyvrcholením 22 propojených snímků z filmového světa studia Marvel a zároveň zakončením epické cesty superhrdinů."
    },
    {
        title: "Shrek",
        background: "https://image.tmdb.org/t/p/original/j46mGvyoGK9TBH2c1syEg6jGSAO.jpg",
        logo: "https://image.tmdb.org/t/p/original/aHdDXMXOAgejOVoupZBULvcfcQG.png",
        description: "Pro záchranu svého domova se zlobr a oslík dohodnou s intrikánským lordem, že osvobodí krásnou princeznu."
    },
    {
        title: "Madagaskar 3",
        background: "https://image.tmdb.org/t/p/original/9VbNbdVqVBISn4pe6gvYkvVWggm.jpg",
        logo: "https://image.tmdb.org/t/p/original/zFdwQ5XJ8h8uAH943jNSorEWOUM.png",
        description: "Na útěku před francouzskou policistkou pro kontrolu zvířat se Alex a jeho přátelé schovávají v putovním cirkusu."
    },
    {
        title: "Mrtvá nevěsta",
        background: "https://image.tmdb.org/t/p/original/jQ1T7mThUYEFhQrfOFCRepVGe1v.jpg",
        logo: "https://image.tmdb.org/t/p/original/hrTz8M55rwC08IBf0MoW8BBBAfc.png",
        description: "Van Dortovi a Everglotovi chystají svatbu svých dětí. Snoubenci, kteří se poprvé setkají až těsně před sňatkem, se do sebe okamžitě zamilují."
    },
    {
        title: "Creed 2",
        background: "https://image.tmdb.org/t/p/original/uYJQeakgSrp7peOoH7d0GfUBsyN.jpg",
        logo: "https://image.tmdb.org/t/p/original/bSvErsk6t4UwMiMW2aaLzHShFqP.png",
        description: "Další kapitola příběhu Adonise Creeda pojednává o jeho zážitcích v ringu i mimo něj. Hlavní hrdina se potýká s nově nabytou slávou a problémy s rodinou."
    }
];

// Funkce pro výběr náhodného filmu
function getRandomFeaturedMovie() {
    const randomIndex = Math.floor(Math.random() * featuredMovies.length);
    return featuredMovies[randomIndex];
}

// Funkce pro nastavení hero sekce
function setRandomHeroMovie() {
    const randomMovie = getRandomFeaturedMovie();
    
    // Najdeme hero sekci a nastavíme pozadí
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.background = `linear-gradient(to right, rgba(20,20,20,0.8) 0%, rgba(20,20,20,0.4) 50%, transparent 100%), url('${randomMovie.background}')`;
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'center';
    }
    
    // Najdeme logo a popis a nastavíme je
    const heroLogo = document.querySelector('.hero-logo');
    const heroDescription = document.querySelector('.hero-description');
    
    if (heroLogo) {
        heroLogo.src = randomMovie.logo;
        heroLogo.alt = randomMovie.title;
    }
    
    if (heroDescription) {
        heroDescription.textContent = randomMovie.description;
    }
}

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
    video.src = streamUrl;
    setupCustomControls();
    
    video.play().catch(error => {
        alert(`Nelze přehrát: ${channelName}`);
    });
}

function setupCustomControls() {
    const video = document.getElementById('video');
    const playPauseBtn = document.querySelector('.play-pause');
    const progressBar = document.querySelector('.progress');
    const progressContainer = document.querySelector('.progress-bar');
    const timeDisplay = document.querySelector('.time');
    const volumeBtn = document.querySelector('.volume-btn');
    const speedBtn = document.querySelector('.speed-btn');

    playPauseBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playPauseBtn.textContent = '⏸️';
        } else {
            video.pause();
            playPauseBtn.textContent = '▶';
        }
    });

    progressContainer.addEventListener('click', (e) => {
        const rect = progressContainer.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        video.currentTime = pos * video.duration;
    });

    video.addEventListener('timeupdate', () => {
        const progress = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${progress}%`;
        
        const currentTime = formatTime(video.currentTime);
        const duration = formatTime(video.duration);
        timeDisplay.textContent = `${currentTime} / ${duration}`;
    });

    volumeBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        volumeBtn.textContent = video.muted ? '🔇' : '🔊';
    });

    let speedIndex = 0;
    const speeds = [0.5, 1, 1.5, 2];
    speedBtn.addEventListener('click', () => {
        speedIndex = (speedIndex + 1) % speeds.length;
        video.playbackRate = speeds[speedIndex];
        speedBtn.textContent = `Rychlost (${speeds[speedIndex]}x)`;
    });

    video.addEventListener('ended', () => {
        playPauseBtn.textContent = '▶';
    });
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

document.addEventListener('DOMContentLoaded', function() {
    // Nastavíme náhodný film při načtení stránky
    setRandomHeroMovie();
    // Načteme playlist
    loadPlaylist();
});

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