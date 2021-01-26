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
  //TO DO
  //SET EXPIRE DATE OF PAGE/ID TO 24 HOURS FROM NOW

  const { longURL } = req.body;
  const shortened = new ShortURL(longURL);

  res.send(view(req.headers.host + '/' + shortened.id));
});
server.get('/:shortURL', (req, res) => {
  //TODO
  //UPDATE EXPIRE DATE OF PAGE/UNIQUEID TO 24 HOURS

  const { shortURL } = req.params;
  res.redirect( ShortURL.getID(shortURL) ?? '/');
});
server.listen(port, () => console.log(`Running on http://localhost:${port}`))

if (module.hot) {
  module.hot.accept(['./view', './model']);
}
