import firebase from 'firebase/app';
import boardData from '../../helpers/data/boardsData';
import utils from '../../helpers/utils';
import 'firebase/auth';

const updatePinForm = (pinId) => {
  const myUid = firebase.auth().currentUser.uid;
  let domString = '';
  boardData.getBoardsbyUid(myUid)
    .then((boards) => {
      domString += `<form class="container col-4 edit-pin-form" id="${pinId}">`;
      domString += '<div class="form-group">';
      domString += '<label for="board-id">Select New Board:</label>';
      domString += '<select class="form-control" id="edit-board-id">';
      boards.forEach((board) => {
        domString += `<option value="${board.id}">${board.name}</option>`;
      });
      domString += '</select>';
      domString += '</div>';
      domString += '<button class="btn btn-success" id="edit-pin-button">Submit</button>';
      domString += '</form>';
      utils.printToDom('single-view', '');
      utils.printToDom('edit-pin', domString);
    })
    .catch((err) => console.error('could not get boards', err));
};

export default { updatePinForm };
