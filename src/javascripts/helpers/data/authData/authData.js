import firebase from 'firebase/app';
import 'firebase/auth';

const authDiv = $('#auth');
const board = $('#boards');
const logoutButton = $('#navbar-logout-button');
const header = $('#home');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.addClass('hide');
      header.addClass('hide');
      board.removeClass('hide');
      logoutButton.removeClass('hide');
    } else {
      authDiv.removeClass('hide');
      header.removeClass('hide');
      board.addClass('hide');
      logoutButton.addClass('hide');
    }
  });
};

export default { checkLoginStatus };
