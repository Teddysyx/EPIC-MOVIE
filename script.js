const m3uUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://pastebin.com/raw/zKSiSwfd');

let allChannels = [];
let currentHeroMovie = null;
let isHeroLoading = false;

const featuredMovies = [
    {
        title: "Někdo to rád blond",
        background: "https://image.tmdb.org/t/p/original/8L7FEp6yY9E1qQODqx3H7ah9qxA.jpg",
        logo: "https://image.tmdb.org/t/p/original/5z7b2SxNZnpN7iYQ8x8ZX6O3u9p.png",
        description: "Dva agenti FBI černé pleti mají ochránit dvě bílé holky z bohaté rodiny před únosem a nenapadne je nic lepšího, než se za ně prostě převléknout.",
        searchTerms: ["někdo to rád blond", "some like it hot", "white chicks"],
        fallbackLogo: "https://occ-0-7126-38.1.nflxso.net/dnm/api/v6/EoHVaU89wiqWzvLSlV9p-61bVe8/AAAABU_Rf1qGN3wUqvzuxw1CgRSc9jTFf7J_vbYGkGPaIBDDeNr5hqCTEwM-K6o20qKoh8Mk5dD0NX8MBdLEW3vc97dNgfZtgKjCbnYK2R7WM5E.webp?r=d09",
        fallbackBackground: "https://image.tmdb.org/t/p/original/85k0kaoRgGmF6ACq0M61AFxhjLN.jpg"
    },
    {
        title: "Adamsova rodina 2",
        background: "https://image.tmdb.org/t/p/original/sZhTfYouKM1iV3rVbgIVEQFQogA.jpg",
        logo: "https://image.tmdb.org/t/p/original/5zP0Em4MjK0m4ehOzqzMuMaBbMb.png",
        description: "Sourozenci Wednesday a Pugsley Addamsovi udělají všechno pro to, aby se zbavili nejmladšího brášky Puberta, kterého rodiče Gomez a Morticia zbožňují.",
        searchTerms: ["adamsova rodina 2", "addams family 2"],
        fallbackLogo: "https://via.placeholder.com/400x150/333333/FFFFFF?text=Adamsova+rodina+2",
        fallbackBackground: "https://image.tmdb.org/t/p/original/sZhTfYouKM1iV3rVbgIVEQFQogA.jpg"
    },
    {
        title: "BATMAN",
        background: "https://image.tmdb.org/t/p/original/tRS6jvPM9qPrrnx2KRp3ew96Yot.jpg",
        logo: "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.png",
        description: "Batman už druhým rokem bojuje proti zločinu a odhaluje korupci v Gothamu. Pronásleduje sériového vraha Riddlera, který se zaměřuje na místní smetánku.",
        searchTerms: ["batman", "the batman", "batman 2022"],
        fallbackLogo: "https://static.wikia.nocookie.net/international-entertainment-project/images/b/bc/The_Batman_%282022%29_-_logo_%28English%29.png/revision/latest?cb=20230102195150",
        fallbackBackground: "https://image.tmdb.org/t/p/original/tRS6jvPM9qPrrnx2KRp3ew96Yot.jpg"
    },
    {
        title: "Křižovatka smrti",
        background: "https://image.tmdb.org/t/p/original/qUOaR1ongf8sz9pZcL7ARrnpGKw.jpg",
        logo: "https://image.tmdb.org/t/p/original/dMvZk3Qb0Z1n2An6B5M0PqYf8Fq.png",
        description: "Pokus o atentát pošle inspektora Leeho a detektiva Cartera do Paříže, aby chránili klíčového svědka, zatímco se snaží dostat gang Triády před spravedlnost.",
        searchTerms: ["křižovatka smrti", "rush hour 3"],
        fallbackLogo: "https://via.placeholder.com/400x150/333333/FFFFFF?text=Křižovatka+smrti",
        fallbackBackground: "https://image.tmdb.org/t/p/original/qUOaR1ongf8sz9pZcL7ARrnpGKw.jpg"
    },
    {
        title: "Spider-Man 3",
        background: "https://image.tmdb.org/t/p/original/uPWkD0dZ4eyKIPY82HpbIipjSBb.jpg",
        logo: "https://image.tmdb.org/t/p/original/wcCvcacqg4TiiuI017RyGEPeenE.png",
        description: "Peter Parker od sebe odhání svoje nejbližší a bojuje s nepřáteli, zloduchy i tajemnou silou, která přidává temné odstíny jeho pavoučímu převleku.",
        searchTerms: ["spider-man 3", "spiderman 3"],
        fallbackLogo: "https://via.placeholder.com/400x150/333333/FFFFFF?text=Spider-Man+3",
        fallbackBackground: "https://image.tmdb.org/t/p/original/uPWkD0dZ4eyKIPY82HpbIipjSBb.jpg"
    },
    {
        title: "Avengers: Endgame",
        background: "https://image.tmdb.org/t/p/original/h9q0ozwMWy7CK5U7FSZsMVtbsCQ.jpg",
        logo: "https://image.tmdb.org/t/p/original/pjZSBgMDYjEhyanp8aahfE1KcAn.png",
        description: "Čtvrtý díl ságy o Avengers je vyvrcholením 22 propojených snímků z filmového světa studia Marvel a zároveň zakončením epické cesty superhrdinů.",
        searchTerms: ["avengers endgame", "avengers 4"],
        fallbackLogo: "https://via.placeholder.com/400x150/333333/FFFFFF?text=Avengers+Endgame",
        fallbackBackground: "https://image.tmdb.org/t/p/original/h9q0ozwMWy7CK5U7FSZsMVtbsCQ.jpg"
    },
    {
        title: "Shrek",
        background: "https://image.tmdb.org/t/p/original/j46mGvyoGK9TBH2c1syEg6jGSAO.jpg",
        logo: "https://image.tmdb.org/t/p/original/aHdDXMXOAgejOVoupZBULvcfcQG.png",
        description: "Pro záchranu svého domova se zlobr a oslík dohodnou s intrikánským lordem, že osvobodí krásnou princeznu.",
        searchTerms: ["shrek"],
        fallbackLogo: "https://via.placeholder.com/400x150/333333/FFFFFF?text=Shrek",
        fallbackBackground: "https://image.tmdb.org/t/p/original/j46mGvyoGK9TBH2c1syEg6jGSAO.jpg"
    },
    {
        title: "Madagaskar 3",
        background: "https://image.tmdb.org/t/p/original/9VbNbdVqVBISn4pe6gvYkvVWggm.jpg",
        logo: "https://image.tmdb.org/t/p/original/zFdwQ5XJ8h8uAH943jNSorEWOUM.png",
        description: "Na útěku před francouzskou policistkou pro kontrolu zvířat se Alex a jeho přátelé schovávají v putovním cirkusu.",
        searchTerms: ["madagaskar 3", "madagascar 3"],
        fallbackLogo: "https://via.placeholder.com/400x150/333333/FFFFFF?text=Madagaskar+3",
        fallbackBackground: "https://image.tmdb.org/t/p/original/9VbNbdVqVBISn4pe6gvYkvVWggm.jpg"
    },
    {
        title: "Mrtvá nevěsta",
        background: "https://image.tmdb.org/t/p/original/jQ1T7mThUYEFhQrfOFCRepVGe1v.jpg",
        logo: "https://image.tmdb.org/t/p/original/hrTz8M55rwC08IBf0MoW8BBBAfc.png",
        description: "Van Dortovi a Everglotovi chystají svatbu svých dětí. Snoubenci, kteří se poprvé setkají až těsně před sňatkem, se do sebe okamžitě zamilují.",
        searchTerms: ["mrtvá nevěsta", "corpse bride"],
        fallbackLogo: "https://via.placeholder.com/400x150/333333/FFFFFF?text=Mrtvá+nevěsta",
        fallbackBackground: "https://image.tmdb.org/t/p/original/jQ1T7mThUYEFhQrfOFCRepVGe1v.jpg"
    },
    {
        title: "Creed 2",
        background: "https://image.tmdb.org/t/p/original/uYJQeakgSrp7peOoH7d0GfUBsyN.jpg",
        logo: "https://image.tmdb.org/t/p/original/bSvErsk6t4UwMiMW2aaLzHShFqP.png",
        description: "Další kapitola příběhu Adonise Creeda pojednává o jeho zážitcích v ringu i mimo něj. Hlavní hrdina se potýká s nově nabytou slávou a problémy s rodinou.",
        searchTerms: ["creed 2", "creed ii"],
        fallbackLogo: "https://via.placeholder.com/400x150/333333/FFFFFF?text=Creed+2",
        fallbackBackground: "https://image.tmdb.org/t/p/original/uYJQeakgSrp7peOoH7d0GfUBsyN.jpg"
    }
];

function getRandomFeaturedMovie() {
    const randomIndex = Math.floor(Math.random() * featuredMovies.length);
    return featuredMovies[randomIndex];
}

function setRandomHeroMovie() {
    if (isHeroLoading) return;
    
    isHeroLoading = true;
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    heroContent.innerHTML = '<div class="hero-loading">Načítám film...</div>';
    heroSection.classList.add('hidden');
    
    setTimeout(() => {
        const randomMovie = getRandomFeaturedMovie();
        currentHeroMovie = randomMovie;
        
        const bgImage = new Image();
        bgImage.onload = function() {
            heroSection.style.background = `linear-gradient(to right, rgba(20,20,20,0.8) 0%, rgba(20,20,20,0.4) 50%, transparent 100%), url('${randomMovie.background}')`;
        };
        bgImage.onerror = function() {
            heroSection.style.background = `linear-gradient(to right, rgba(20,20,20,0.8) 0%, rgba(20,20,20,0.4) 50%, transparent 100%), url('${randomMovie.fallbackBackground}')`;
        };
        bgImage.src = randomMovie.background;
        
        heroContent.innerHTML = `
            <img src="${randomMovie.logo}" alt="${randomMovie.title}" class="hero-logo" 
                 onerror="this.src='${randomMovie.fallbackLogo}'">
            <p class="hero-description">${randomMovie.description}</p>
            <div class="hero-buttons">
                <button class="play-btn">▶ Přehrát</button>
                <button class="info-btn">ℹ Více informací</button>
            </div>
        `;
        
        const newPlayBtn = heroContent.querySelector('.play-btn');
        newPlayBtn.addEventListener('click', () => {
            if (currentHeroMovie && currentHeroMovie.streamUrl) {
                playChannel(currentHeroMovie.streamUrl, currentHeroMovie.title);
            } else {
                alert('Pro tento film není dostupný stream. Zkuste jiný film.');
            }
        });
        
        heroSection.classList.remove('hidden');
        isHeroLoading = false;
    }, 300);
}

function assignStreamUrls() {
    featuredMovies.forEach(movie => {
        let bestMatch = null;
        let bestScore = 0;

        allChannels.forEach(channel => {
            const channelName = channel.name.toLowerCase();
            let score = 0;

            movie.searchTerms.forEach(term => {
                if (channelName.includes(term.toLowerCase())) {
                    score += term.length;
                }
            });

            if (score > bestScore) {
                bestScore = score;
                bestMatch = channel;
            }
        });

        if (bestMatch && bestScore > 0) {
            movie.streamUrl = bestMatch.url;
            console.log(`Přiřazeno: ${movie.title} -> ${bestMatch.name}`);
        } else {
            console.log(`Nenalezen stream pro: ${movie.title}`);
        }
    });
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
        
        assignStreamUrls();
        
        displayMovies(allChannels);
    } catch (error) {
        console.error('Chyba:', error);
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
    document.body.style.overflow = 'hidden';
    
    video.src = streamUrl;
    setupCustomControls();
    
    video.play().catch(error => {
        console.error('Chyba při přehrávání:', error);
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
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    const closePlayerBtn = document.querySelector('.close-player-btn');

    let isDragging = false;

    function togglePlayPause() {
        if (video.paused) {
            video.play();
            playPauseBtn.textContent = '⏸️';
        } else {
            video.pause();
            playPauseBtn.textContent = '▶';
        }
    }

    playPauseBtn.addEventListener('click', togglePlayPause);
    video.addEventListener('click', togglePlayPause);

    function updateProgress(e) {
        if (!isDragging) return;
        const rect = progressContainer.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        video.currentTime = percent * video.duration;
    }

    progressContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        updateProgress(e);
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
        video.currentTime = percent * video.duration;
    });

    video.addEventListener('timeupdate', () => {
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
    });

    let speedIndex = 1;
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    speedBtn.addEventListener('click', () => {
        speedIndex = (speedIndex + 1) % speeds.length;
        video.playbackRate = speeds[speedIndex];
        speedBtn.textContent = `Rychlost (${speeds[speedIndex]}x)`;
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
    });

    closePlayerBtn.addEventListener('click', hidePlayer);

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
    document.body.style.overflow = 'auto';
}

document.addEventListener('DOMContentLoaded', function() {
    setRandomHeroMovie();
    loadPlaylist();
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
        hidePlayer();
    }
});