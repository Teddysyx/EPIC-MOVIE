let allChannels = [];
let currentHeroMovie = null;
let controlsTimeout;

const featuredMovies = [
    // Všechny featuredMovies zůstávají stejné
    {
        title: "Někdo to rád blond",
        background: "https://image.tmdb.org/t/p/original/8L7FEp6yY9E1qQODqx3H7ah9qxA.jpg",
        logo: "https://image.tmdb.org/t/p/original/5z7b2SxNZnpN7iYQ8x8ZX6O3u9p.png",
        description: "Dva agenti FBI černé pleti mají ochránit dvě bílé holky z bohaté rodiny před únosem a nenapadne jim nic lepšího, než se za ně prostě převléknout.",
        streamUrl: "https://pixeldrain.com/api/file/1cYyBHPh"
    },
    // ... všechny ostatní filmy zůstávají stejné
];

allChannels = [
    // VŠECHNY filmy zůstávají stejné
    {name: "Někdo to rád blond", logo: "https://www.kfilmu.net/obrazky/plakaty/nekdo-to-rad-blond-2807.jpg", url: "https://pixeldrain.com/api/file/1cYyBHPh"},
    // ... všechny ostatní filmy zůstávají stejné
];

document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.visibility = 'hidden';
    }
    
    setRandomHeroMovie();
    displayMovies(allChannels);
    setupCustomControls();
    setupSearchToggle();
});

function getRandomFeaturedMovie() {
    const randomIndex = Math.floor(Math.random() * featuredMovies.length);
    return featuredMovies[randomIndex];
}

function setRandomHeroMovie() {
    const randomMovie = getRandomFeaturedMovie();
    currentHeroMovie = randomMovie;
    
    const heroSection = document.querySelector('.hero');
    const heroLogo = document.querySelector('.hero-logo');
    const heroDescription = document.querySelector('.hero-description');
    
    if (heroSection) {
        heroSection.style.background = `linear-gradient(to right, rgba(20,20,20,0.8) 0%, rgba(20,20,20,0.4) 50%, transparent 100%), url('${randomMovie.background}')`;
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'center';
        heroSection.style.visibility = 'visible';
    }
    
    if (heroLogo) {
        heroLogo.src = randomMovie.logo;
        heroLogo.alt = randomMovie.title;
    }
    
    if (heroDescription) {
        heroDescription.textContent = randomMovie.description;
    }
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
    
    // Zobrazit přehrávač
    videoPlayer.className = 'video-player-visible';
    document.body.style.overflow = 'hidden';
    
    // Vytvořit nové iframe pro přehrávání
    const iframe = document.createElement('iframe');
    
    // Upravit URL pro správné přehrávání - Pixeldrain vyžaduje download parametr
    const videoUrl = streamUrl + (streamUrl.includes('?') ? '&' : '?') + 'download';
    
    iframe.src = videoUrl;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.allow = 'autoplay; fullscreen';
    iframe.allowFullscreen = true;
    
    // Vyčistit video wrapper a přidat iframe
    const videoWrapper = document.querySelector('.video-wrapper');
    videoWrapper.innerHTML = '';
    videoWrapper.appendChild(iframe);
    
    // Přidat tlačítko pro zavření
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-player-btn-simple';
    closeBtn.textContent = '✕ Zavřít';
    closeBtn.onclick = hidePlayer;
    videoWrapper.appendChild(closeBtn);
}

function setupCustomControls() {
    const closeBtn = document.querySelector('.close-player-btn-simple');
    if (closeBtn) {
        closeBtn.addEventListener('click', hidePlayer);
    }
}

function hidePlayer() {
    const videoPlayer = document.getElementById('video-player');
    const videoWrapper = document.querySelector('.video-wrapper');
    
    // Vyčistit iframe
    videoWrapper.innerHTML = `
        <video id="video" controls playsinline webkit-playsinline style="max-width: 100%; max-height: 100%;">
            <source id="video-source" type="video/mp4">
        </video>
        <button class="close-player-btn-simple">✕ Zavřít</button>
    `;
    
    videoPlayer.className = 'video-player-hidden';
    document.body.style.overflow = 'auto';
    
    // Znovu nastavit event listener pro zavření
    const newCloseBtn = document.querySelector('.close-player-btn-simple');
    if (newCloseBtn) {
        newCloseBtn.addEventListener('click', hidePlayer);
    }
}

function setupSearchToggle() {
    const searchToggleBtn = document.querySelector('.search-toggle-btn');
    const navSearchOverlay = document.querySelector('.nav-search-overlay');
    const searchCloseBtn = document.querySelector('.search-close-btn');
    const searchInput = document.getElementById('search-input');
    
    function openSearch() {
        navSearchOverlay.classList.add('active');
        setTimeout(() => {
            searchInput.focus();
        }, 300);
    }
    
    function closeSearch() {
        navSearchOverlay.classList.remove('active');
        searchInput.value = '';
        displayMovies(allChannels);
    }
    
    searchToggleBtn.addEventListener('click', openSearch);
    searchCloseBtn.addEventListener('click', closeSearch);
    
    document.addEventListener('keyup', function(e) {
        if (e.key === 'Escape') {
            closeSearch();
        }
    });
    
    navSearchOverlay.addEventListener('click', function(e) {
        if (e.target === navSearchOverlay) {
            closeSearch();
        }
    });
    
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            displayMovies(allChannels);
            return;
        }
        
        const filteredMovies = allChannels.filter(channel => 
            channel.name.toLowerCase().includes(searchTerm)
        );
        
        if (filteredMovies.length > 0) {
            displayMovies(filteredMovies);
        } else {
            const movieContainer = document.getElementById('movie-container');
            movieContainer.innerHTML = '<div class="loading">Žádné filmy nebyly nalezeny</div>';
        }
    });
}

const playBtn = document.querySelector('.play-btn');
if (playBtn) {
    playBtn.addEventListener('click', () => {
        if (currentHeroMovie && currentHeroMovie.streamUrl) {
            playChannel(currentHeroMovie.streamUrl, currentHeroMovie.title);
        }
    });
}