import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoardsbyUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const theBoards = response.data;
      const myBoards = [];
      if (theBoards) {
        Object.keys(theBoards).forEach((boardId) => {
          theBoards[boardId].id = boardId;
          myBoards.push(theBoards[boardId]);
        });
      }
      resolve(myBoards);
    })
    .catch((err) => reject(err));
});

export default { getBoardsbyUid };
