const fs = require('fs');
const os = require('os');

module.exports = (req, res, next) => {
  const now = new Date();
  const { method, url } = req;
  const userAgent = req.get('user-agent');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const data = `${hours}:${minutes}:${seconds} ${method}: ${url} user-agent: ${userAgent}`;

  fs.appendFile('server.log', data + os.EOL, err => { if (err) console.log(err); });

  next();
};