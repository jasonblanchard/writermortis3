import actionConstants from 'app/actions/constants';
import fetch from 'isomorphic-fetch';
import Immutable from 'immutable';

let id = 99;

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

export function loadStory(story) {
  return {
    type: actionConstants.LOAD_STORY,
    story,
  };
}

export function requestStory(storyId) {
  return function (dispatch) {
    fetch(`/api/stories/${storyId}`).then((response) => {
      return response.json();
    }).then((story) => {
      dispatch(loadStory(Immutable.fromJS(story)));
    });
  };
}
