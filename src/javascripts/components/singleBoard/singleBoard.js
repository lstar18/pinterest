import singleBoards from '../../helpers/data/pinData';
import utils from '../../helpers/utils';

const backToBoards = () => {

};
const buildSingleBoardView = (e) => {
  const boardId = e.target.closest('.card').id;
  singleBoards.getPinsByBoardId(boardId)
    .then((singleBoard) => {
      let domString = '';
      domString += '<h2 class="text-center">Featured Board</h2>';
      domString += '<div class="col-3">';
      domString += '<div class="card text-white bg-dark">';
      domString += '<div class="card-header"> Pins </div>';
      singleBoard.forEach((board) => {
        domString += `<img class="image m-3" src="${board.imageUrl}">`;
      });
      domString += '<button class="btn btn-seconardary" id="back-button"></button> <i class="fas fa-arrow-circle-left"></i>';
      domString += '</div>';
      domString += '</div>';
      $('#back-button').on('click', backToBoards);
      utils.printToDom('singleBoardView', domString);
      utils.printToDom('boards', '');
    })
    .catch((err) => console.error('problem with single board', err));
};

export default { buildSingleBoardView };
