import actionConstants from 'app/actions/constants';

let id = 99;

export function addSomeValue(value) {
  return {
    type: actionConstants.ADD_SOME_VALUE,
    value,
  };
}

export function addNewPiece(piece) {
  return {
    type: actionConstants.ADD_NEW_PIECE,
    piece,
  };
}

export function requestAddNewPiece(piece) {
  return function (dispatch) {
    let newPiece = piece;
    newPiece = newPiece.set('id', id++);
    return dispatch(addNewPiece(newPiece));
  };
}
