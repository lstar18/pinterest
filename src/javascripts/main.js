import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import authData from './helpers/data/authData/authData';
import myNavBar from './components/myNavBar/myNavBar';
import header from './components/home/home';
import '../styles/main.scss';
import auth from './components/auth/auth';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  auth.loginButton();
  myNavBar.logoutEvent();
  header.displayPinterest();
};

init();
