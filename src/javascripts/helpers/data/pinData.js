import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPinsByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => {
      const theBoardPins = response.data;
      const boardPins = [];
      Object.keys(theBoardPins).forEach((pin) => {
        theBoardPins[pin].id = boardId;
        boardPins.push(theBoardPins[boardId]);
      });
      resolve(boardPins);
    })
    .catch((err) => reject(err));
});

export default { getPinsByBoardId };
