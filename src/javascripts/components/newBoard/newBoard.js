import utils from '../../helpers/utils';

const showForm = () => {
  let domString = '';
  domString += '<h2 class="text-center"> Create New Board </h2>';
  domString += '<form class="col-10 offset-1">';
  domString += '<div class="form-group">';
  domString += '<label for="board-name"> Board Name</label>';
  domString += '<input type="text" class="form-control" id="board-name">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="board-description">Description</label>';
  domString += '<input type="text" class="form-control" id="board-description">';
  domString += '</div>';
  domString += '<button type="submit" class="btn btn-dark" id="board-creator-button">Add Board</button>';
  utils.printToDom('addNewBoard', domString);
};

export default { showForm };
