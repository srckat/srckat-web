// this is now practically useless, as arparec no longer exists. im gonna keep this here because im too lazy to remove it

// Get the audio element
const audio = document.getElementById('arpa-mpeg-radio');

// Your HLS stream URL
const url = 'https://radio.arparec.xyz/stream';

// Function to initialize audio
function initAudio() {
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(audio);
    hls.on(Hls.Events.MANIFEST_PARSED, function() {
      audio.play();
    });
  } else if (audio.canPlayType('application/vnd.apple.mpegurl')) {
    // Safari
    audio.src = url;
    audio.addEventListener('loadedmetadata', () => {
      audio.play();
    });
  } else {
    console.error('HLS is not supported in this browser.');
  }
}

// Initialize the audio when the page loads
window.addEventListener('DOMContentLoaded', initAudio);
