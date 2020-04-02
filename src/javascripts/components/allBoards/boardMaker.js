const boardMaker = (board) => {
  let domString = '';
  domString += `<div class="card m-2 text-center" id="${board.id}">`;
  domString += '<div class="card-body">';
  domString += '<button class="btn btn-light view-board-button"><i class="far fa-eye"></i></button>';
  domString += '<button class="btn btn-light delete-board-button"><i class="fas fa-trash"></i></button>';
  domString += `<h5 class="card-title">${board.name}</h5>`;
  domString += `<p class="card-text">${board.description}</p>`;
  domString += '</div>';
  domString += '</div>';

  return domString;
};

export default { boardMaker };
