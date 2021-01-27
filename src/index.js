import express from 'express';
import view from './view';
import ShortURL from './model';

const port = process.env.PORT || 3000;
const server = express();

server.use(express.urlencoded());
server.use(express.json());

server.get('/', (req, res) => {
  // Serve main page
  res.send(view());
});
server.post('/', (req, res) => {
  const { longURL } = req.body;
  if (!longURL) return res.send(view());

  const shortened = new ShortURL(longURL);

  res.send(view(req.headers.host + '/' + shortened.id));
});
server.get('/:shortURL', (req, res) => {
  const { shortURL } = req.params;
  const longURL = ShortURL.getURL(shortURL);
  if (longURL) {
    res.redirect(longURL);
  }
  else {
    res.sendStatus(404);
  }
});
server.listen(port, () => console.log(`Running on http://localhost:${port}`))

if (module.hot) {
  module.hot.accept(['./view', './model', './db']);
}
