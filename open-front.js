const open = require('open');
const http = require('http');

const port = 5173;
const url = `http://localhost:${port}`;

function waitForServerToBeReady(retries = 50, delay = 200) {
  return new Promise((resolve, reject) => {
    const check = (attempt = 1) => {
      const req = http.get(url, (res) => {
        resolve();
      });

      req.on('error', () => {
        if (attempt < retries) {
          setTimeout(() => check(attempt + 1), delay);
        } else {
          reject(new Error("Servidor não respondeu a tempo."));
        }
      });

      req.end();
    };

    check();
  });
}

console.log("⌛ Aguardando Vite iniciar...");

waitForServerToBeReady()
  .then(() => {
    console.log(`🌐 Abrindo navegador em ${url}`);
    return open(url);
  })
  .catch((err) => {
    console.error("❌ Não foi possível conectar ao servidor:", err.message);
  });
