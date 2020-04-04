import firebase from 'firebase/app';
import 'firebase/auth';
import pinsData from '../../helpers/data/pinData';
import boardData from '../../helpers/data/boardsData';
import utils from '../../helpers/utils';
import boardComponent from '../allBoards/boardMaker';
import singleBoard from '../singleBoard/singleBoard';

const completelyRemoveBoards = (e) => {
  const boardId = e.target.closest('.card').id;
  boardData.deleteBoard(boardId)
    .then(() => {
      pinsData.getPinsByBoardId(boardId).then((pins) => {
        pins.forEach((pin) => {
          pinsData.deletePin(pin.id);
        });
      });
      // eslint-disable-next-line no-use-before-define
      buildBoards();
    })
    .catch((err) => console.error('remove board broke', err));
};

const displayBoardHeader = () => {
  const domString = '<h1> BOARDS </h1>';
  utils.printToDom('boards', domString);
};

const buildBoards = () => {
  const myUid = firebase.auth().currentUser.uid;
  boardData.getBoardsbyUid(myUid)
    .then((myBoards) => {
      let domString = '';
      domString += '<h2 class="text-center">My Boards</h2>';
      domString += '<div class="single-board d-flex flex-wrap justify-content-center">';
      myBoards.forEach((board) => {
        domString += boardComponent.boardMaker(board);
      });
      domString += '</div>';
      utils.printToDom('boards', domString);
      $('body').on('click', '.delete-board-button', completelyRemoveBoards);
      $('#boards').on('click', '.view-board-button', singleBoard.viewBoardEvent);
    })
    .catch((err) => console.error('get boards broke', err));
};

export default { displayBoardHeader, buildBoards, completelyRemoveBoards };
