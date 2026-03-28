const API_KEY = "SUA_API_KEY_AQUI";
const CHANNEL_ID = "SEU_CHANNEL_ID_AQUI";

let currentVideoId = null;

// Buscar live atual
async function getLiveVideoId() {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`
    );

    const data = await res.json();

    if (data.items.length > 0) {
      return data.items[0].id.videoId;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Erro:", err);
    return null;
  }
}

// Carregar chat
async function loadChat() {
  const videoId = await getLiveVideoId();

  if (!videoId) {
    console.log("Sem live...");
    return;
  }

  // Evita recarregar toda hora
  if (videoId === currentVideoId) return;

  currentVideoId = videoId;

  const chatUrl = `https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${location.hostname}`;

  document.getElementById("chat-frame").src = chatUrl;

  console.log("Chat carregado:", videoId);
}

// Inicializar
loadChat();

// Atualizar a cada 20s
setInterval(loadChat, 20000);
