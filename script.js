const m3uUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://pastebin.com/raw/zKSiSwfd');

let allChannels = [];
let currentPlayingUrl = '';

async function loadPlaylist() {
    try {
        const categoryContainer = document.getElementById('category-container');
        categoryContainer.innerHTML = '<div class="loading">Načítám seznam filmů...</div>';

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
        
        displayChannelsByCategory(allChannels);
        setupSearch();
    } catch (error) {
        console.error('Chyba:', error);
        const categoryContainer = document.getElementById('category-container');
        categoryContainer.innerHTML = `
            <div class="error">
                <p>Nepodařilo se načíst seznam filmů</p>
                <p><small>${error.message}</small></p>
            </div>
        `;
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
            const groupMatch = infoLine.match(/group-title="([^"]*)"/);
            
            const name = nameMatch ? nameMatch[1] : infoLine.split(',').pop() || 'Neznámý film';
            const logo = logoMatch ? logoMatch[1] : 'https://via.placeholder.com/200x300/333333/666666?text=EPIC+MOVIE';
            const group = groupMatch ? groupMatch[1] : 'Filmy';
            
            if (urlLine && !urlLine.startsWith('#') && urlLine !== '') {
                channels.push({
                    name: name,
                    logo: logo,
                    group: group,
                    url: urlLine
                });
            }
        }
    }
    return channels;
}

function displayChannelsByCategory(channels) {
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = '';

    const groups = {};
    
    channels.forEach(channel => {
        if (!groups[channel.group]) {
            groups[channel.group] = [];
        }
        groups[channel.group].push(channel);
    });

    for (const [groupName, groupChannels] of Object.entries(groups)) {
        if (groupChannels.length === 0) continue;

        const categorySection = document.createElement('div');
        categorySection.className = 'category fade-in';
        
        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = groupName;
        categorySection.appendChild(categoryTitle);
        
        const channelRow = document.createElement('div');
        channelRow.className = 'channel-row';
        
        groupChannels.forEach(channel => {
            const channelElement = document.createElement('div');
            channelElement.className = 'channel-item';
            channelElement.innerHTML = `
                <img src="${channel.logo}" alt="${channel.name}" class="channel-logo" 
                     onerror="this.src='https://via.placeholder.com/200x300/333333/666666?text=EPIC+MOVIE'">
                <div class="channel-name">${channel.name}</div>
            `;
            
            channelElement.addEventListener('click', () => playChannel(channel.url, channel.name));
            channelRow.appendChild(channelElement);
        });
        
        categorySection.appendChild(channelRow);
        categoryContainer.appendChild(categorySection);
    }
}

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            displayChannelsByCategory(allChannels);
            return;
        }
        
        const filteredChannels = allChannels.filter(channel => 
            channel.name.toLowerCase().includes(searchTerm) ||
            channel.group.toLowerCase().includes(searchTerm)
        );
        
        displaySearchResults(filteredChannels, searchTerm);
    });
}

function displaySearchResults(channels, searchTerm) {
    const categoryContainer = document.getElementById('category-container');
    
    if (channels.length === 0) {
        categoryContainer.innerHTML = `
            <div class="no-results fade-in">
                <h2>Výsledky hledání pro: "${searchTerm}"</h2>
                <p>Nenalezeny žádné filmy</p>
            </div>
        `;
        return;
    }
    
    categoryContainer.innerHTML = '';
    
    const searchSection = document.createElement('div');
    searchSection.className = 'category fade-in';
    
    const searchTitle = document.createElement('h2');
    searchTitle.textContent = `Výsledky hledání pro: "${searchTerm}" (${channels.length} filmů)`;
    searchSection.appendChild(searchTitle);
    
    const channelRow = document.createElement('div');
    channelRow.className = 'channel-row';
    
    channels.forEach(channel => {
        const channelElement = document.createElement('div');
        channelElement.className = 'channel-item';
        channelElement.innerHTML = `
            <img src="${channel.logo}" alt="${channel.name}" class="channel-logo" 
                 onerror="this.src='https://via.placeholder.com/200x300/333333/666666?text=EPIC+MOVIE'">
            <div class="channel-name">${channel.name}</div>
        `;
        
        channelElement.addEventListener('click', () => playChannel(channel.url, channel.name));
        channelRow.appendChild(channelElement);
    });
    
    searchSection.appendChild(channelRow);
    categoryContainer.appendChild(searchSection);
}

function playChannel(streamUrl, channelName) {
    currentPlayingUrl = streamUrl;
    
    const videoPlayer = document.getElementById('video-player');
    const video = document.getElementById('video');
    
    videoPlayer.className = 'video-player-visible';
    
    setTimeout(() => {
        video.src = streamUrl;
        video.load();
        
        video.play().catch(error => {
            console.error('Chyba při přehrávání:', error);
            alert(`Nelze přehrát: ${channelName}\n\nZkontrolujte:\n• Připojení k internetu\n• Formát videa\n• Podporu prohlížeče`);
        });
    }, 300);
}

function hidePlayer() {
    const videoPlayer = document.getElementById('video-player');
    const video = document.getElementById('video');
    
    video.pause();
    video.src = '';
    videoPlayer.className = 'video-player-hidden';
    currentPlayingUrl = '';
}

document.addEventListener('DOMContentLoaded', loadPlaylist);

document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
        hidePlayer();
    }
});