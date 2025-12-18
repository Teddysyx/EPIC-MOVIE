let allChannels = [];
let currentHeroMovie = null;
let controlsTimeout;
let hls = null;

const featuredMovies = [
    {
        title: "Někdo to rád blond",
        background: "https://image.tmdb.org/t/p/original/8L7FEp6yY9E1qQODqx3H7ah9qxA.jpg",
        logo: "https://image.tmdb.org/t/p/original/5z7b2SxNZnpN7iYQ8x8ZX6O3u9p.png",
        description: "Dva agenti FBI černé pleti mají ochránit dvě bílé holky z bohaté rodiny před únosem a nenapadne jim nic lepšího, než se za ně prostě převléknout.",
        streamUrl: "https://pixeldrain.com/api/file/1cYyBHPh?download"
    },
    // ... zbytek filmů stejný, jen přidat ?download ke všem streamUrl
];

allChannels = [
    {name: "Někdo to rád blond", logo: "https://www.kfilmu.net/obrazky/plakaty/nekdo-to-rad-blond-2807.jpg", url: "https://pixeldrain.com/api/file/1cYyBHPh?download"},
    // ... přidat ?download ke všem URL v allChannels
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
    
    // Nejprve zobrazit přehrávač
    videoPlayer.className = 'video-player-visible';
    document.body.style.overflow = 'hidden';
    
    // Přestat přehrávat aktuální video
    video.pause();
    video.src = '';
    
    // Vytvořit nový source element s proper MIME typem
    const source = document.createElement('source');
    source.src = streamUrl;
    source.type = 'video/mp4';
    
    // Vyčistit staré zdroje a přidat nový
    video.innerHTML = '';
    video.appendChild(source);
    
    // Načíst video
    video.load();
    
    // Pokusit se přehrát
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log('Autoplay failed:', error);
            // Zobrazit zprávu uživateli
            alert('Pro přehrání klikněte na play tlačítko ve videu. Některé prohlížeče blokují automatické přehrávání.');
        });
    }
}

function setupCustomControls() {
    const closeBtn = document.querySelector('.close-player-btn-simple');
    if (closeBtn) {
        closeBtn.addEventListener('click', hidePlayer);
    }
}

function hidePlayer() {
    const videoPlayer = document.getElementById('video-player');
    const video = document.getElementById('video');
    
    video.pause();
    video.src = '';
    video.innerHTML = '';
    
    videoPlayer.className = 'video-player-hidden';
    document.body.style.overflow = 'auto';
    clearTimeout(controlsTimeout);
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