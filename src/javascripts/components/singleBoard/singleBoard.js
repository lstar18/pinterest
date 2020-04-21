import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';
import newPinComponent from '../newPin/newPin';


const removePins = (e) => {
  const pinId = e.target.closest('.card').id;
  const removePinBoardId = e.data;
  pinData.deletePins(pinId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildSingleBoardView(removePinBoardId);
      // utils.printToDom('singleBoardView', '');
    }).catch((err) => console.error('could not delete pins', err));
};
const makeNewPin = (e) => {
  e.preventDefault();
  const selectedBoard = $(e.target).closest('button')[0].dataset.id;
  const newPin = {
    pinUrl: $('#pin-url').val(),
    boardId: selectedBoard,
  };
  pinData.addPins(newPin)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildSingleBoardView(selectedBoard);
      utils.printToDom('singleBoardView', '');
    })
    .catch((err) => console.error('could not add new pin', err));
};

const boardsDiv = $('#boards');
const pinsDiv = $('#singleBoardView');

const backToBoards = (e) => {
  e.preventDefault();
  boardsDiv.removeClass('hide');
  pinsDiv.addClass('hide');
};

const buildSingleBoardView = (boardId) => {
  pinData.getPinsByBoardId(boardId)
    .then((singleBoard) => {
      let domString = '';
      domString += '<h2 class="text-center">Featured Board</h2>';
      domString += '<button class="btn btn-light" id="back-button"> <i class="fas fa-arrow-circle-left"></i> </button>';
      domString += `<button class="btn btn-danger" id="add-new-pin-button" data-id=${boardId} > <i class="fas fa-plus "></i> </button>`;
      domString += `<div class="d-flex flex-wrap m-2 justify-content-center pins-container" data-id=${boardId}>`;
      singleBoard.forEach((pin) => {
        domString += `<div class="card" id="${pin.id}">`;
        domString += `<img class="image" src="${pin.imageUrl}">`;
        domString += '<button class="btn btn-light delete-single-pin"> <i class="fas fa-trash"></i> </button>';
        domString += '</div>';
      });
      domString += '</div>';
      pinsDiv.removeClass('hide');
      boardsDiv.addClass('hide');
      utils.printToDom('singleBoardView', domString);
      $('#add-new-pin-button').click(newPinComponent.showNewPin);
    })
    .catch((err) => console.error('problem with single board', err));
};
const viewBoardEvent = (e) => {
  const boardId = e.target.closest('.card').id;
  buildSingleBoardView(boardId);
};

const singleBoardEvents = (boardId) => {
  $('body').on('click', '#back-button', backToBoards);
  $('body').on('click', '.delete-single-pin', boardId, removePins);
  $('body').on('click', '#pin-creator-button', boardId, makeNewPin);
};

export default { viewBoardEvent, buildSingleBoardView, singleBoardEvents };
