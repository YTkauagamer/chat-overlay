const overlay = document.getElementById("overlay");

const socket = new WebSocket("wss://irc-ws.chat.twitch.tv:443");
const channel = "youtubekaua";
socket.onopen = () => {
  socket.send("PASS SCHMOOPIIE");
  socket.send("NICK justinfan12345");
  socket.send(`JOIN #${channel}`);
};

socket.onmessage = (event) => {
  const message = event.data;

  if (message.includes("PRIVMSG")) {
    const tags = getTags(message);
    const chatMessage = message.split("PRIVMSG")[1].split(":")[1].trim();

    if (tags.mod || tags.broadcaster) {
      if (commands[chatMessage]) {
        showMedia(commands[chatMessage]);
      }
    }
  }
};

function showMedia(url) {
  const img = document.createElement("img");
  img.src = url;

  overlay.appendChild(img);

  setTimeout(() => {
    img.remove();
  }, 5000);
}

function getTags(raw) {
  const tags = raw.split(" ")[0];
  return {
    mod: tags.includes("mod=1"),
    broadcaster: tags.includes("broadcaster/1")
  };
}
