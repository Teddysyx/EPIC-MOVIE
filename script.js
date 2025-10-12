const m3uUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://pastebin.com/raw/zKSiSwfd');

async function loadPlaylist() {
    try {
        const categoryContainer = document.getElementById('category-container');
        categoryContainer.innerHTML = '<div class="loading">Načítám seznam kanálů...</div>';

        const response = await fetch(m3uUrl);
        
        if (!response.ok) {
            throw new Error('Chyba při načítání dat');
        }
        
        const m3uText = await response.text();
        
        if (!m3uText.includes('#EXTINF:')) {
            throw new Error('Neplatný formát M3U souboru');
        }
        
        const channels = parseM3U(m3uText);
        
        if (channels.length === 0) {
            throw new Error('Žádné kanály nenalezeny');
        }
        
        displayChannelsByCategory(channels);
    } catch (error) {
        console.error('Chyba:', error);
        const categoryContainer = document.getElementById('category-container');
        categoryContainer.innerHTML = `
            <div class="error">
                <p>Nepodařilo se načíst seznam kanálů</p>
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
            
            const name = nameMatch ? nameMatch[1] : infoLine.split(',').pop() || 'Neznámý kanál';
            const logo = logoMatch ? logoMatch[1] : 'https://via.placeholder.com/200x120/333333/666666?text=EPIC';
            const group = groupMatch ? groupMatch[1] : 'Ostatní';
            
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
        const categorySection = document.createElement('div');
        categorySection.className = 'category';
        
        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = groupName;
        categorySection.appendChild(categoryTitle);
        
        const channelGrid = document.createElement('div');
        channelGrid.className = 'channel-grid';
        
        groupChannels.forEach(channel => {
            const channelElement = document.createElement('div');
            channelElement.className = 'channel-item';
            channelElement.innerHTML = `
                <img src="${channel.logo}" alt="${channel.name}" class="channel-logo" 
                     onerror="this.src='https://via.placeholder.com/200x120/333333/666666?text=EPIC'">
                <div class="channel-name">${channel.name}</div>
            `;
            
            channelElement.addEventListener('click', () => playChannel(channel.url));
            channelGrid.appendChild(channelElement);
        });
        
        categorySection.appendChild(channelGrid);
        categoryContainer.appendChild(categorySection);
    }
}

function playChannel(streamUrl) {
    const videoPlayer = document.getElementById('video-player');
    const video = document.getElementById('video');
    
    video.src = streamUrl;
    videoPlayer.className = 'video-player-visible';
    
    video.play().catch(error => {
        console.error('Chyba při přehrávání:', error);
        alert('Nelze přehrát tento stream');
    });
}

function hidePlayer() {
    const videoPlayer = document.getElementById('video-player');
    const video = document.getElementById('video');
    
    video.pause();
    video.src = '';
    videoPlayer.className = 'video-player-hidden';
}

document.addEventListener('DOMContentLoaded', loadPlaylist);