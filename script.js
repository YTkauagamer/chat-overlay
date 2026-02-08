const overlay = document.getElementById("overlay");

function showMedia(url) {
  const img = document.createElement("img");
  img.src = url;
  overlay.appendChild(img);

  setTimeout(() => img.remove(), 5000);
}

// 🔴 TROQUE APENAS O NOME DO CANAL
const client = new tmi.Client({
  connection: { secure: true, reconnect: true },
  channels: ["youtubekaua"]
});

client.connect();

client.on("message", (channel, tags, message, self) => {
  if (self) return;

  const cmd = message.trim();

  // só streamer ou mod
  if ((tags.mod || tags.badges?.broadcaster) && commands[cmd]) {
    showMedia(commands[cmd]);
  }
});
