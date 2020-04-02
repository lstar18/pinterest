import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPinsByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => {
      const theBoardPins = response.data;
      const boardPins = [];
      Object.keys(theBoardPins).forEach((pinId) => {
        theBoardPins[pinId].id = pinId;
        boardPins.push(theBoardPins[pinId]);
      });
      resolve(boardPins);
    })
    .catch((err) => reject(err));
});

const deletePins = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

export default { getPinsByBoardId, deletePins };
