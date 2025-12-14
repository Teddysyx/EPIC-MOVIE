const m3uUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://pastebin.com/raw/zKSiSwfd');

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
        description: "Další kapitola příběhu Adonise Creeda pojednává o jeho zážitcích v ringu i mimo něj. Hlavní hrdina se potýká s nově nabytou slávou a problémy s rodinou.",
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
        movieContainer.innerHTML = '<div class="loading">Nepodařilo se načíst filmy. Zkuste to prosím později.</div>';
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
            
            let name = nameMatch ? nameMatch[1] : '';
            if (!name) {
                const parts = infoLine.split(',');
                name = parts.length > 1 ? parts[parts.length - 1].trim() : 'Neznámý film';
            }
            
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
    document.body.style.overflow = 'hidden';
    
    // Vyčistit předchozí HLS instanci
    if (hls) {
        hls.destroy();
        hls = null;
    }
    
    // Nastavit video na ztlumené pro bypass autoplay politiky
    video.muted = true;
    
    // Detekce typu streamu
    if (streamUrl.includes('.m3u8')) {
        // HLS stream
        if (Hls.isSupported()) {
            hls = new Hls({
                enableWorker: true,
                lowLatencyMode: false,
                backBufferLength: 90,
                maxBufferLength: 30,
                maxMaxBufferLength: 60
            });
            hls.loadSource(streamUrl);
            hls.attachMedia(video);
            
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                const playPromise = video.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        // Automatické zapnutí zvuku po spuštění
                        setTimeout(() => {
                            video.muted = false;
                            const volumeBtn = document.querySelector('.volume-btn');
                            if (volumeBtn) volumeBtn.textContent = '🔊';
                        }, 100);
                    }).catch(error => {
                        console.error('Chyba při přehrávání:', error);
                        // Pokus znovu s interakcí uživatele
                        showPlayButton(streamUrl, channelName);
                    });
                }
            });
            
            hls.on(Hls.Events.ERROR, function(event, data) {
                if (data.fatal) {
                    console.error('Kritická chyba HLS:', data);
                    switch(data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            console.error('Síťová chyba - pokus o obnovení');
                            hls.startLoad();
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            console.error('Chyba média - pokus o opravu');
                            hls.recoverMediaError();
                            break;
                        default:
                            hls.destroy();
                            alert(`Nelze přehrát stream: ${channelName}\nChyba: ${data.details}`);
                            hidePlayer();
                            break;
                    }
                }
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // Nativní HLS podpora (Safari)
            video.src = streamUrl;
            const playPromise = video.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setTimeout(() => {
                        video.muted = false;
                        const volumeBtn = document.querySelector('.volume-btn');
                        if (volumeBtn) volumeBtn.textContent = '🔊';
                    }, 100);
                }).catch(error => {
                    console.error('Chyba při přehrávání:', error);
                    showPlayButton(streamUrl, channelName);
                });
            }
        } else {
            alert('Váš prohlížeč nepodporuje přehrávání HLS streamů');
            hidePlayer();
        }
    } else {
        // Běžný video stream (MP4, atd.)
        video.src = streamUrl;
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                setTimeout(() => {
                    video.muted = false;
                    const volumeBtn = document.querySelector('.volume-btn');
                    if (volumeBtn) volumeBtn.textContent = '🔊';
                }, 100);
            }).catch(error => {
                console.error('Chyba při přehrávání:', error);
                showPlayButton(streamUrl, channelName);
            });
        }
    }
    
    resetControlsTimer();
}

function showPlayButton(streamUrl, channelName) {
    const video = document.getElementById('video');
    const videoWrapper = document.querySelector('.video-wrapper');
    
    // Vytvoření velkého play tlačítka
    const bigPlayBtn = document.createElement('div');
    bigPlayBtn.className = 'big-play-button';
    bigPlayBtn.innerHTML = '▶';
    
    bigPlayBtn.addEventListener('click', () => {
        video.muted = false;
        video.play().then(() => {
            bigPlayBtn.remove();
            const volumeBtn = document.querySelector('.volume-btn');
            if (volumeBtn) volumeBtn.textContent = '🔊';
        }).catch(error => {
            console.error('Stále nelze přehrát:', error);
            alert(`Nelze přehrát: ${channelName}`);
        });
    });
    
    videoWrapper.appendChild(bigPlayBtn);
}

function setupCustomControls() {
    const closeBtn = document.querySelector('.close-player-btn-simple');
    if (closeBtn) {
        closeBtn.addEventListener('click', hidePlayer);
    }
}

function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

function hidePlayer() {
    const videoPlayer = document.getElementById('video-player');
    const iframe = document.getElementById('video-iframe');
    
    iframe.src = '';
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
playBtn.addEventListener('click', () => {
    if (currentHeroMovie && currentHeroMovie.streamUrl) {
        playChannel(currentHeroMovie.streamUrl, currentHeroMovie.title);
    } else {
        alert('Pro tento film není dostupný stream.');
    }
});