import utils from '../../helpers/utils';

const showNewPin = (e) => {
  const boardId = $(e.target).closest('button')[0].dataset.id;
  let domString = '';
  domString += '<h2 class="text-center"> New Pin </h2>';
  domString += '<form>';
  domString += '<div class="form-group">';
  domString += '<label for="pin-url">Url for Pin</label>';
  domString += '<input type="text" class="form-control" id="pin-url">';
  domString += '</div>';
  domString += '</form>';
  domString += `<button type="submit" class="btn btn-dark" id="pin-creator-button" data-id=${boardId} >Add Pin</button>`;
  utils.printToDom('singleBoardView', domString);
};

export default { showNewPin };
