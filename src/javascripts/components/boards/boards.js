import firebase from 'firebase/app';
import 'firebase/auth';
import pinsData from '../../helpers/data/pinData';
import boardData from '../../helpers/data/boardsData';
import utils from '../../helpers/utils';
import boardComponent from '../boardMaker/boardMaker';
import singleBoard from '../singleBoard/singleBoard';
import newBoardComponent from '../newBoard/newBoard';

const updatePin = (e) => {
  e.preventDefault();
  const pinId = e.target.closest('.edit-pin-form').id;
  const editedPin = $('#edit-board-id').val();
  pinsData.updatePin(pinId, editedPin)
    .then(() => {
      utils.printToDom('edit-pin', '');
      // eslint-disable-next-line no-use-before-define
      buildBoards();
    })
    .catch((err) => console.error('could not update pin to board', err));
};
// Function that allow you to create a board
const makeABoard = (e) => {
  e.preventDefault();
  const newBoard = {
    name: $('#board-name').val(),
    description: $('#board-description').val(),
    uid: firebase.auth().currentUser.uid,
  };
  boardData.addBoard(newBoard)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildBoards();
      utils.printToDom('addNewBoard', '');
    })
    .catch((err) => console.error('could not add board', err));
};
// Function that removes a board
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
// function that allows the user to see the header of the page
const displayBoardHeader = () => {
  const domString = '<h1> BOARDS </h1>';
  utils.printToDom('boards', domString);
};
// function grabs all board that belong to the current user and displays them
const buildBoards = () => {
  const myUid = firebase.auth().currentUser.uid;
  boardData.getBoardsbyUid(myUid)
    .then((myBoards) => {
      let domString = '';
      domString += '<h2 class="text-center">My Boards</h2>';
      domString += '<button class="btn btn-success" id="show-add-board-form"><i class="fas fa-plus"></i></button>';
      domString += '<div class="single-board d-flex flex-wrap justify-content-center">';
      myBoards.forEach((board) => {
        domString += boardComponent.boardMaker(board);
      });
      domString += '</div>';
      utils.printToDom('boards', domString);
      $('#show-add-board-form').click(newBoardComponent.showForm);
    })
    .catch((err) => console.error('get boards broke', err));
};

const boardEvents = () => {
  $('body').on('click', '.delete-board-button', completelyRemoveBoards);
  $('#boards').on('click', '.view-board-button', singleBoard.viewBoardEvent);
  $('body').on('click', '#board-creator-button', makeABoard);
  $('body').on('click', '#edit-pin-button', updatePin);
};

export default {
  displayBoardHeader, buildBoards, completelyRemoveBoards, boardEvents,
};
