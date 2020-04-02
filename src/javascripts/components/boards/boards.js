import firebase from 'firebase/app';
import 'firebase/auth';
// import pinsData from '../../helpers/data/pinData';
import boardData from '../../helpers/data/boardsData';
import utils from '../../helpers/utils';
import boardComponent from '../allBoards/boardMaker';
import singleBoard from '../singleBoard/singleBoard';

// const completelyRemoveBoards = (boardId) => new Promise((resolve, reject) => {
//   boardData.deleteBoards(boardId)
//     .then(() => {
//       // 1.  GET all pins by boardId
//       pinsData.getPinsByBoardId(boardId).then((allBoards) => {
//         // 2.  loop over all pins from step 1 and DELETE each one
//         allBoards.forEach((pin) => {
//           pinsData.deletePins(pin.id);
//         });
//         resolve();
//       });
//     })
//     .catch((err) => reject(err));
// });

// const removeBoards = (e) => {
//   const boardId = e.target.closest('.card').id;
//   const removeBoardId = e.data;
//   boardData.deleteBoards(pinId)
//     .then(() => {
//       // eslint-disable-next-line no-use-before-define
//       buildBoards(removePinBoardId);
//       // utils.printToDom('singleBoardView', '');
//     }).catch((err) => console.log('could not delete pins', err));
// };

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
      // $('body').on('click', '.single-board', removeBoards);
      $('#boards').on('click', '.view-board-button', singleBoard.viewBoardEvent);
    })
    .catch((err) => console.error('get boards broke', err));
};

export default { displayBoardHeader, buildBoards };
