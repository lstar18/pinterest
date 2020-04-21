import firebase from 'firebase/app';
import 'firebase/auth';
import boardsComponent from '../../../components/boards/boards';
import singleBoardComponent from '../../../components/singleBoard/singleBoard';

const authDiv = $('#auth');
const board = $('#boards');
const logoutButton = $('#navbar-logout-button');
const header = $('#home');
const singleBoard = $('#singleBoardView');
const addBoard = $('#addNewBoard');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.addClass('hide');
      header.addClass('hide');
      board.removeClass('hide');
      logoutButton.removeClass('hide');
      singleBoard.removeClass('hide');
      addBoard.removeClass('hide');
      boardsComponent.buildBoards();
      boardsComponent.boardEvents();
      singleBoardComponent.singleBoardEvents();
    } else {
      authDiv.removeClass('hide');
      header.removeClass('hide');
      board.addClass('hide');
      logoutButton.addClass('hide');
      singleBoard.addClass('hide');
      addBoard.addClass('hide');
    }
  });
};

export default { checkLoginStatus };
