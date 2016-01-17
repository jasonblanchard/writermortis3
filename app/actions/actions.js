import actionConstants from 'app/actions/constants';
import fetch from 'isomorphic-fetch';
import Immutable from 'immutable';

export function addNewPiece(piece) {
  return {
    type: actionConstants.ADD_NEW_PIECE,
    piece,
  };
}

export function requestAddNewPiece(storyId, piece) {
  return function (dispatch) {
    fetch(`/api/stories/${storyId}/pieces`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({ piece }),
    }).then(response => {
      return response.json();
    }).then(newPiece => {
      dispatch(addNewPiece(Immutable.fromJS(newPiece)));
    });
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
