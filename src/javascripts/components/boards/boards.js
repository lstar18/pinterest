import utils from '../../helpers/utils';

const displayBoardHeader = () => {
  const domString = '<h1> BOARDS </h1>';
  utils.printToDom('boards', domString);
};

export default { displayBoardHeader };
