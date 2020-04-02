import singleBoards from '../../helpers/data/pinData';
import utils from '../../helpers/utils';

const removePins = (e) => {
  const pinId = e.target.closest('.card').id;
  const removePinBoardId = e.data;
  singleBoards.deletePins(pinId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildSingleBoardView(removePinBoardId);
      // utils.printToDom('singleBoardView', '');
    }).catch((err) => console.error('could not delete pins', err));
};

const boardsDiv = $('#boards');
const pinsDiv = $('#singleBoardView');

const backToBoards = (e) => {
  e.preventDefault();
  boardsDiv.removeClass('hide');
  pinsDiv.addClass('hide');
};

const buildSingleBoardView = (boardId) => {
  singleBoards.getPinsByBoardId(boardId)
    .then((singleBoard) => {
      let domString = '';
      domString += '<h2 class="text-center">Featured Board</h2>';
      domString += '<div class="d-flex flex-wrap">';
      singleBoard.forEach((pin) => {
        domString += `<div class="card" id="${pin.id}">`;
        domString += `<img class="image" src="${pin.imageUrl}">`;
        domString += '<button class="btn btn-light delete-single-pin"> <i class="fas fa-trash"></i> </button>';
        domString += '</div>';
      });
      domString += '<button class="btn btn-light" id="back-button"> <i class="fas fa-arrow-circle-left"></i> </button>';
      domString += '</div>';
      pinsDiv.removeClass('hide');
      boardsDiv.addClass('hide');
      utils.printToDom('singleBoardView', domString);
      $('body').on('click', '.delete-single-pin', boardId, removePins);
      $('#back-button').click(backToBoards);
    })
    .catch((err) => console.error('problem with single board', err));
};
const viewBoardEvent = (e) => {
  const boardId = e.target.closest('.card').id;
  buildSingleBoardView(boardId);
};

export default { viewBoardEvent, buildSingleBoardView };
