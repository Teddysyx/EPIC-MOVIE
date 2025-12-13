// Adresa pro M3U playlist
const m3uUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://pastebin.com/raw/zKSiSwfd');

// KLÍČOVÉ: CORS proxy pro streamy. Tato by měla fungovat i pro Pixeldrain.
// Pokud by nefungovala, zkus ji změnit zpět na: 'https://cors-anywhere.herokuapp.com/'
const corsProxy = 'https://thingproxy.freeboard.io/fetch/'; 

let allChannels = [];
let currentHeroMovie = null;
let controlsTimeout;

// Seznam doporučených filmů
const featuredMovies = [
    {
        title: "Někdo to rád blond",
        background: "https://image.tmdb.org/t/p/original/8L7FEp6yY9E1qQODqx3H7ah9qxA.jpg",
        logo: "https://image.tmdb.org/t/p/original/5z7b2SxNZnpN7iYQ8x8ZX6O3u9p.png",
        description: "Dva agenti FBI černé pleti mají ochránit dvě bílé holky z bohaté rodiny před únosem a nenapadne je nic lepšího, než se za ně prostě převléknout.",
        streamUrl: "https://pixeldrain.com/api/file/1cYyBHPh"
    },
    {
        title: "Adamsova rodina 2",
        background: "https://image.tmdb.org/t/p/original/sZhTfYouKM1iV3rVbgIVEQFQogA.jpg",
        logo: "https://image.tmdb.org/t/p/original/5zP0Em4MjK0m4ehOzqzMuMaBbMb.png",
        description: "Sourozenci Wednesday a Pugsley Addamsovi udělají všechno pro to, aby se zbavili nejmladšího brášky Puberta, kterého rodiče Gomez a Morticia zbožňují.",
        streamUrl: "https://pixeldrain.com/api/file/dAMhaKDR"
    },
    {
        title: "BATMAN",
        background: "https://image.tmdb.org/t/p/original/tRS6jvPM9qPrrnx2KRp3ew96Yot.jpg",
        logo: "https://pixeldrain.com/api/file/pMNZ7xTz",
        description: "Batman už druhým rokem bojuje proti zločinu a odhaluje korupci v Gothamu. Pronásleduje sériového vraha Riddlera, který se zaměřuje na místní smetánku.",
        streamUrl: "https://pixeldrain.com/api/file/j4gnSaKr"
    },
    {
        title: "Křižovatka smrti",
        background: "https://image.tmdb.org/t/p/original/qUOaR1ongf8sz9pZcL7ARrnpGKw.jpg",
        logo: "https://image.tmdb.org/t/p/original/dMvZk3Qb0Z1n2An6B5M0PqYf8Fq.png",
        description: "Pokus o atentát pošle inspektora Leeho a detektiva Cartera do Paříže, aby chránili klíčového svědka, zatímco se snaží dostat gang Triády před spravedlnost.",
        streamUrl: "https://pixeldrain.com/api/file/9QWAvwXs"
    },
    {
        title: "Spider-Man 3",
        background: "https://image.tmdb.org/t/p/original/uPWkD0dZ4eyKIPY82HpbIipjSBb.jpg",
        logo: "https://image.tmdb.org/t/p/original/wcCvcacqg4TiiuI017RyGEPeenE.png",
        description: "Peter Parker od sebe odhání svoje nejbližší a bojuje s nepřáteli, zloduchy i tajemnou silou, která přidává temné odstíny jeho pavoučímu převleku.",
        streamUrl: "https://pixeldrain.com/api/file/zTaD9STY"
    },
    {
        title: "Avengers: Endgame",
        background: "https://image.tmdb.org/t/p/original/h9q0ozwMWy7CK5U7FSZsMVtbsCQ.jpg",
        logo: "https://image.tmdb.org/t/p/original/pjZSBgMDYjEhyanp8aahfE1KcAn.png",
        description: "Čtvrtý díl ságy o Avengers je vyvrcholením 22 propojených snímků z filmového světa studia Marvel a zároveň zakončením epické cesty superhrdinů.",
        streamUrl: "https://pixeldrain.com/api/file/qiD2RvuX"
    },
    {
        title: "Shrek",
        background: "https://image.tmdb.org/t/p/original/j46mGvyoGK9TBH2c1syEg6jGSAO.jpg",
        logo: "https://image.tmdb.org/t/p/original/aHdDXMXOAgejOVoupZBULvcfcQG.png",
        description: "Pro záchranu svého domova se zlobr a oslík dohodnou s intrikánským lordem, že osvobodí krásnou princeznu.",
        streamUrl: "https://pixeldrain.com/api/file/R5AYiRTR"
    },
    {
        title: "Madagaskar 3",
        background: "https://image.tmdb.org/t/p/original/9VbNbdVqVBISn4pe6gvYkvVWggm.jpg",
        logo: "https://image.tmdb.org/t/p/original/zFdwQ5XJ8h8uAH943jNSorEWOUM.png",
        description: "Na útěku před francouzskou policistkou pro kontrolu zvířat se Alex a jeho přátelé schovávají v putovním cirkusu.",
        streamUrl: "https://pixeldrain.com/api/file/9qag2HJX"
    },
    {
        title: "Mrtvá nevěsta",
        background: "https://image.tmdb.org/t/p/original/jQ1T7mThUYEFhQrfOFCRepVGe1v.jpg",
        logo: "https://image.tmdb.org/t/p/original/hrTz8M55rwC08IBf0MoW8BBBAfc.png",
        description: "Van Dortovi a Everglotovi chystají svatbu svých dětí. Snoubenci, kteří se poprvé setkají až těsně před sňatkem, se do sebe okamžitě zamilují.",
        streamUrl: "https://pixeldrain.com/api/file/xs3nCanV"
    },
    {
        title: "Creed 2",
        background: "https://image.tmdb.org/t/p/original/uYJQeakgSrp7peOoH7d0GfUBsyN.jpg",
        logo: "https://image.tmdb.org/t/p/original/bSvErsk6t4UwMiMW2aaLzHShFqP.png",
        description: "Další kapitola příběhu Adonises Creeda pojednává o jeho zážitcích v ringu i mimo něj. Hlavní hrdina se potýká s nově nabytou slávou a problémy s rodinou.",
        streamUrl: "https://pixeldrain.com/api/file/VHaCtTCC"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.visibility = 'hidden';
    }
    
    setRandomHeroMovie();
    loadPlaylist();
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

async function loadPlaylist() {
    try {
        const movieContainer = document.getElementById('movie-container');
        movieContainer.innerHTML = '<div class="loading">Načítám filmy...</div>';

        const response = await fetch(m3uUrl);
        
        if (!response.ok) {
            throw new Error(`Načítání playlistu selhalo s kódem: ${response.status}. Zkus to později.`);
        }
        
        const m3uText = await response.text();
        
        if (!m3uText.includes('#EXTINF:')) {
            throw new Error('Neplatný formát M3U souboru: chybí #EXTINF.');
        }
        
        allChannels = parseM3U(m3uText);
        
        if (allChannels.length === 0) {
            throw new Error('Žádné filmy (kanály) nenalezeny v M3U.');
        }
        
        displayMovies(allChannels);
    } catch (error) {
        const movieContainer = document.getElementById('movie-container');
        movieContainer.innerHTML = `<div class="loading">Nepodařilo se načíst filmy: ${error.message}</div>`;
        console.error('Chyba při načítání playlistu:', error);
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

/**
 * Přehrává video stream. Aplikuje CORS proxy na VŠECHNY externí streamy a řeší Autoplay chybu.
 * @param {string} streamUrl URL streamu
 * @param {string} channelName Název filmu (pro chyby)
 */
function playChannel(streamUrl, channelName) {
    const videoPlayer = document.getElementById('video-player');
    const video = document.getElementById('video');
    
    // 1. Zobrazení přehrávače a zastavení
    videoPlayer.className = 'video-player-visible';
    document.body.style.overflow = 'hidden';
    video.pause(); 
    
    // Zničení hls instance (pokud existuje)
    if (video.hlsInstance) {
        video.hlsInstance.destroy();
        video.hlsInstance = null;
    }

    // 2. Aplikace proxy na KAŽDÝ externí odkaz
    let finalUrl = streamUrl;
    // Předpokládáme, že pokud odkaz začíná http/https, je externí
    if (streamUrl.startsWith('http')) {
        finalUrl = corsProxy + streamUrl; 
        console.log(`Používám CORS proxy pro stream: ${finalUrl}`);
    }
    
    
    // 3. Spuštění přehrávání (HLS versus Nativní)
    
    // Kontrola, zda je stream HLS (.m3u8) a zda je hls.js k dispozici (z index.html)
    if (typeof Hls !== 'undefined' && Hls.isSupported() && finalUrl.toLowerCase().includes('.m3u8')) {
        
        // Použijeme hls.js pro M3U8 streamy
        const hls = new Hls();
        video.hlsInstance = hls; 
        
        hls.on(Hls.Events.ERROR, function (event, data) {
            if (data.fatal) {
                console.error(`HLS FATÁLNÍ CHYBA pro ${channelName}:`, data.details, data);
                if (video.hlsInstance) {
                    video.hlsInstance.destroy();
                }
                alert(`CHYBA: Stream pro film "${channelName}" nelze načíst/analyzovat. Zkus jiný film nebo jinou proxy.`);
            }
        });
        
        hls.loadSource(finalUrl);
        hls.attachMedia(video);
        
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
            // Po úspěšné analýze manifestu se pokusíme spustit video
            video.play().catch(error => {
                console.error('Chyba při spuštění HLS přehrávání:', error);
                alert(`Nelze spustit stream: ${channelName}. Chyba Autoplay: Klikni prosím ještě jednou.`);
            });
        });

    } else {
        // Natvní přehrávání (pro MP4/MKV z Pixeldrain/jinde)
        video.src = finalUrl;
        
        // Musíme video načíst před spuštěním přehrávání
        video.load(); 

        video.play().catch(error => {
            console.error('Chyba při nativním přehrávání:', error);
            // Zobrazíme upozornění na Autoplay
            alert(`Nelze přehrát: ${channelName}. Chyba Autoplay: Klikni prosím ještě jednou.`);
        });
    }
    
    resetControlsTimer();
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

    let isDragging = false;
    
    // Resetování timeoutu ovládacích prvků
    function resetControlsTimer() {
        clearTimeout(controlsTimeout);
        controlsTimeout = setTimeout(hideControls, 3000);
    }
    
    // Zobrazení ovládacích prvků
    function showControls() {
        customControls.classList.remove('controls-hidden');
        resetControlsTimer();
    }
    
    // Skrytí ovládacích prvků
    function hideControls() {
        if (!video.paused) {
            customControls.classList.add('controls-hidden');
        }
    }

    videoWrapper.addEventListener('click', function(e) {
        if (e.target === videoWrapper || e.target === video) {
            showControls();
        }
    });

    videoWrapper.addEventListener('mousemove', showControls);
    
    document.addEventListener('fullscreenchange', function() {
        if (!document.fullscreenElement) {
            showControls(); 
        }
    });

    document.addEventListener('webkitfullscreenchange', function() {
        if (!document.webkitFullscreenElement) {
            showControls();
        }
    });


    function togglePlayPause() {
        if (video.paused) {
            // Zkusíme spustit. Pokud se jedná o chybu Autoplay, druhé kliknutí by mělo pomoci.
            video.play().catch(error => {
                 console.error('Chyba Autoplay po kliknutí:', error);
            });
            playPauseBtn.textContent = '⏸️';
        } else {
            video.pause();
            playPauseBtn.textContent = '▶';
        }
        showControls();
    }

    playPauseBtn.addEventListener('click', togglePlayPause);
    video.addEventListener('click', togglePlayPause);

    function updateProgress(e) {
        if (!isDragging || isNaN(video.duration)) return;
        const rect = progressContainer.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        video.currentTime = percent * video.duration;
    }

    progressContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        updateProgress(e);
        showControls();
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) updateProgress(e);
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    progressContainer.addEventListener('click', (e) => {
        const rect = progressContainer.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        if (!isNaN(video.duration)) {
             video.currentTime = percent * video.duration;
        }
        showControls();
    });

    video.addEventListener('timeupdate', () => {
        if (isNaN(video.duration)) return; // Ignorujeme, dokud není načtena délka

        if (!isDragging) {
            const progress = (video.currentTime / video.duration) * 100;
            progressBar.style.width = `${progress}%`;
        }
        
        const currentTime = formatTime(video.currentTime);
        const duration = formatTime(video.duration);
        timeDisplay.textContent = `${currentTime} / ${duration}`;
    });

    volumeBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        volumeBtn.textContent = video.muted ? '🔇' : '🔊';
        showControls();
    });

    let speedIndex = 2; // Výchozí rychlost 1x (index 2 v poli speeds)
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    speedBtn.addEventListener('click', () => {
        speedIndex = (speedIndex + 1) % speeds.length;
        video.playbackRate = speeds[speedIndex];
        speedBtn.textContent = `Rychlost (${speeds[speedIndex]}x)`;
        showControls();
    });

    fullscreenBtn.addEventListener('click', () => {
        const videoWrapper = document.querySelector('.video-wrapper');
        if (!document.fullscreenElement) {
            videoWrapper.requestFullscreen().catch(err => {
                console.log(`Chyba fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
        showControls();
    });

    closePlayerBtn.addEventListener('click', hidePlayer);

    video.addEventListener('ended', () => {
        playPauseBtn.textContent = '▶';
    });
}

function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

function hidePlayer() {
    const videoPlayer = document.getElementById('video-player');
    const video = document.getElementById('video');
    
    // ZNIČENÍ HLS INSTANCE
    if (video.hlsInstance) {
        video.hlsInstance.destroy();
        video.hlsInstance = null;
    }
    
    video.pause();
    video.src = ''; 
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
        
        const movieContainer = document.getElementById('movie-container');
        
        if (filteredMovies.length > 0) {
            displayMovies(filteredMovies);
        } else {
            movieContainer.innerHTML = '<div class="loading">Žádné filmy nebyly nalezeny</div>';
        }
    });
}

const playBtn = document.querySelector('.play-btn');
playBtn.addEventListener('click', () => {
    if (currentHeroMovie && currentHeroMovie.streamUrl) {
        // Použijeme playChannel pro spuštění i doporučeného filmu
        playChannel(currentHeroMovie.streamUrl, currentHeroMovie.title);
    } else {
        alert('Pro tento film není dostupný stream.');
    }
});
