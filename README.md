# web-dz-true

lab 4 node js
# -----------------
const fs = require('fs');

const filePath = 'example.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Не удалось прочитать:', err);
    return;
  }

  const reversedText = data.split('').reverse().join('');

  fs.writeFile(filePath, reversedText, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('Ревёрс произошёл.');
  });
});

# ------------------------------------

Код который делает ревёрсит надпись в текстовом файле

# -----------------------------------------
const http = require('http');
const fs = require('fs');

const port = 3000;
const filePath = 'example.txt';


const server = http.createServer((req, res) => {

  if (req.method === 'GET' && req.url === '/') {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('чё то упало');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(data);
    });
  }

  else if (req.method === 'POST' && req.url === '/') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      fs.appendFile(filePath, body, 'utf8', (err) => {
        if (err) {
          console.error('не получилось:', err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('чё то упало');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Доступ к файлу получен.');
      });
    });
  }

  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Не найдено');
  }
});


server.listen(port, () => {
  console.log(`Сервер готов http://localhost:${port}`);
});
# ------------------------------------------
Вывод текстового файла в боди сервера
