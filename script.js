const overlay = document.getElementById("overlay");

// 👉 MODO OFFLINE (true = ligado | false = desligado)
const OFFLINE_MODE = false;

function showMedia(url) {
  const img = document.createElement("img");
  img.src = url;
  overlay.appendChild(img);

  setTimeout(() => {
    img.remove();
  }, 5000);
}

// ===== MODO OFFLINE =====
if (OFFLINE_MODE) {
  console.log("🧪 Modo offline ativado");

  document.addEventListener("keydown", (e) => {
    // comandos de teste
    if (e.key === "1") showMedia(commands["!dog"]);
    if (e.key === "2") showMedia(commands["!gg"]);
    if (e.key === "3") showMedia(commands["!cat"]);
  });
}
