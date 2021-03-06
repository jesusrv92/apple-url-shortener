const node = require('@neutrinojs/node');
const mocha = require('@neutrinojs/mocha');

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    node(),
    mocha(),
  ],
};
