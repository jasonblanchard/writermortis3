var Immutable = require('immutable');

module.exports = {
  someValues: [1, 2, 3],
  currentClientId: null,
  story: Immutable.fromJS({
    id: 1,
    title: 'Great Story',
    maxPieces: 5,
    pieceMaxSentences: 3,
    pieces: [
      {
        id: 1,
        text: 'Once upon a time',
        clientId: 1,
      },
      {
        id: 2,
        text: ' an elephant ate an apple. He like it very much.',
        clientId: 2,
      },
    ],
  }),
};
