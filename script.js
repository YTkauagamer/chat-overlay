const chat = document.getElementById("chat");
const gifArea = document.getElementById("gif-area");

// 🔧 CONFIGURAÇÃO
const CHANNEL = "youtubekaua"; // seu canal da Twitch

const client = new tmi.Client({
  channels: [CHANNEL]
});

client.connect();

client.on("message", (channel, tags, message, self) => {
  if (self) return;

  const user = tags["display-name"];
  const isMod = tags.mod || tags.badges?.broadcaster;

  addMessage(user, message);

  // 👉 COMANDOS SÓ PRA MODS E STREAMER
  if (isMod) {
    checkCommands(message);
  }
});

function addMessage(user, text) {
  const msg = document.createElement("div");
  msg.className = "message";
  msg.innerHTML = `<strong>${user}:</strong> ${text}`;
  chat.appendChild(msg);

  if (chat.children.length > 6) {
    chat.removeChild(chat.children[0]);
  }
}

// 🧠 AQUI FICAM OS COMANDOS
function checkCommands(text) {
  const parts = text.split(" ");
  const cmd = parts[0];
  const link = parts[1];

  if (!link) return;

  if (cmd === "!gif" && link.endsWith(".gif")) {
    showMedia(link);
  }

  if (
    cmd === "!img" &&
    (link.endsWith(".png") ||
     link.endsWith(".jpg") ||
     link.endsWith(".jpeg") ||
     link.endsWith(".webp"))
  ) {
    showMedia(link);
  }
}

function showMedia(link) {
  gifArea.innerHTML = "";

  const img = document.createElement("img");
  img.src = link;
  gifArea.appendChild(img);

  setTimeout(() => {
    gifArea.innerHTML = "";
  }, 6000);
    }
