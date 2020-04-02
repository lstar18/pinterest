import singleBoards from '../../helpers/data/pinData';
import utils from '../../helpers/utils';

// const removePins = (e) => {
//   const pinId = e.target.closest('.card').id;
// }


const boardsDiv = $('#boards');
const pinsDiv = $('#singleBoardView');

const backToBoards = (e) => {
  e.preventDefault();
  boardsDiv.removeClass('hide');
  pinsDiv.addClass('hide');
};

const buildSingleBoardView = (e) => {
  const boardId = e.target.closest('.card').id;
  singleBoards.getPinsByBoardId(boardId)
    .then((singleBoard) => {
      let domString = '';
      domString += '<h2 class="text-center">Featured Board</h2>';
      domString += '<div class="d-flex flex-wrap justify-content-center pins-container">';
      domString += '<div class="card text-white bg-dark">';
      domString += '<h4 class="card-header"> Pins </h4>';
      singleBoard.forEach((board) => {
        domString += `<img class="image m-3" src="${board.imageUrl}">`;
        domString += '<button class="btn btn-danger" id="delete-single-pin"></button>';
      });
      domString += '<button class="btn btn-seconardary" id="back-button"> <i class="fas fa-arrow-circle-left"></i> </button>';
      domString += '</div>';
      domString += '</div>';
      pinsDiv.removeClass('hide');
      boardsDiv.addClass('hide');
      utils.printToDom('singleBoardView', domString);
      $('#back-button').click(backToBoards);
    })
    .catch((err) => console.error('problem with single board', err));
};

export default { buildSingleBoardView };
