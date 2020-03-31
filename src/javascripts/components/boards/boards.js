import firebase from 'firebase/app';
import 'firebase/auth';
import boardData from '../../helpers/data/boardsData';
import utils from '../../helpers/utils';
import boardComponent from '../allBoards/boardMaker';
import singleBoardEvent from '../singleBoard/singleBoard';

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
      domString += '<div class="cardBoards d-flex flex-wrap">';
      myBoards.forEach((board) => {
        domString += boardComponent.boardMaker(board);
      });
      domString += '</div>';
      utils.printToDom('boards', domString);
      $('body').on('click', '.card', singleBoardEvent.buildSingleBoardView);
    })
    .catch((err) => console.error('get boards broke', err));
};

export default { displayBoardHeader, buildBoards };
