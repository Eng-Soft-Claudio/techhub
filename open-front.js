const open = require('open');

const port = 5173;
const url = `http://localhost:${port}`;

setTimeout(() => {
  open(url);
}, 5000);
