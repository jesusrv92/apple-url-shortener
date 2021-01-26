import express from 'express';
import normalizeURL from 'normalize-url';
import view from './view';

const port = process.env.PORT || 3000;
const server = express();

//TODO
//CONNECTION WITH SERVER

server.use(express.urlencoded());
server.use(express.json());

server.get('/', (req, res) => {
  // Serve main page
  res.send(view());
});
server.post('/', (req, res) => {
  //TO DO
  //NORMALIZE URL
  //CHECK IF PAGE EXISTS
  //IF IT DOESNT, CREATE NEW ENTRY
  // GENERATE UNIQUE ID
  // CHECK IF UNIQUEID EXISTS
  // IF IT DOES, CREATE ANOTHER AND CHECK AGAIN
  // IF IT DOESN'T, ASIGN NEW ID TO PAGE
  //IF IT DOES, RETRIEVE PREVIOUS ENTRY AND RETURN IT
  //SET EXPIRE DATE OF PAGE/ID TO 24 HOURS FROM NOW

  const { longURL } = req.body;
  const longUrlNormalized = normalizeURL(longURL);
  
  const buff = Buffer.from(longUrlNormalized);
  const uniqueID = buff.toString('base64');

  res.send(view(req.headers.host + '/' + uniqueID));
});
server.get('/:shortURL', (req, res) => {
  //TODO
  //CHECK WITH SERVER IF SHORTURL EXISTS
  //IF IT DOES, SEND USER TO STORED URL
  //UPDATE EXPIRE DATE OF PAGE/UNIQUEID TO 24 HOURS
  //IF IT DOESN'T, SEND TO MAIN PAGE
  const { shortURL } = req.params;
  
  const buff = Buffer.from(shortURL, 'base64');
  const longURL = buff.toString('ascii');

  res.redirect(longURL);
});
server.listen(port, () => console.log(`Running on http://localhost:${port}`))

if (module.hot) {
  module.hot.accept('./view');
}
