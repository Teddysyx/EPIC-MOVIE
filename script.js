const m3uUrl = 'https://pastebin.com/raw/zKSiSwfd';

async function loadPlaylist() {
    try {
        const response = await fetch(m3uUrl);
        const m3uText = await response.text();
        const channels = parseM3U(m3uText);
        displayChannels(channels);
    } catch (error) {
        document.getElementById('channel-list').innerHTML = "<p>Nepodařilo se načíst seznam.</p>";
    }
}

function parseM3U(m3uText) {
    const channels = [];
    const lines = m3uText.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('#EXTINF:')) {
            const infoLine = lines[i];
            const url = lines[i + 1];
            
            const nameMatch = infoLine.match(/tvg-name="([^"]*)"/);
            const channelName = nameMatch ? nameMatch[1] : 'Neznámý kanál';
            
            if (url && url.trim() !== '') {
                channels.push({ name: channelName, url: url.trim() });
            }
        }
    }
    return channels;
}

function displayChannels(channels) {
    const channelList = document.getElementById('channel-list');
    channelList.innerHTML = '';

    channels.forEach(channel => {
        const channelElement = document.createElement('div');
        channelElement.className = 'channel-item';
        channelElement.textContent = channel.name;
        channelElement.addEventListener('click', () => playChannel(channel.url));
        channelList.appendChild(channelElement);
    });
}

function playChannel(streamUrl) {
    const videoPlayer = document.getElementById('video-player');
    const video = document.getElementById('video');
    
    video.src = streamUrl;
    videoPlayer.style.display = 'flex';
    video.play();
}

function hidePlayer() {
    const videoPlayer = document.getElementById('video-player');
    const video = document.getElementById('video');
    
    video.pause();
    video.src = '';
    videoPlayer.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', loadPlaylist);