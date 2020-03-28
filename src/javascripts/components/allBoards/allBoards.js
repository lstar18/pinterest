const boardMaker = (board) => {
  let domString = '';
  domString += `<div class="card m-2" id="${board.id}"`;
  domString += '<div class="card text-center">';
  domString += '<div class="card-body">';
  domString += `<h5 class="card-title">${board.name}</h5>`;
  domString += `<p class="card-text">${board.description}</p>`;
  domString += '</div>';
  domString += '</div>';

  return domString;
};

export default { boardMaker };
