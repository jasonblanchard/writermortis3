import actionConstants from 'app/actions/constants';
import fetch from 'isomorphic-fetch';
import Immutable from 'immutable';
import { normalize, Schema, arrayOf } from 'normalizr';

export const storySchema = new Schema('story');
export const pieceSchema = new Schema('piece');
export const clientUserSchema = new Schema('clientUser');

storySchema.define({
  pieces: arrayOf(pieceSchema),
});

pieceSchema.define({
  clientUser: clientUserSchema,
});

export function addNewPiece(piece) {
  return {
    type: actionConstants.ADD_NEW_PIECE,
    piece,
  };
}

export function loadEntities(entities) {
  return {
    type: actionConstants.LOAD_ENTITIES,
    entities,
  };
}

export function requestAddNewPiece(story, piece) {
  return function (dispatch, getState) {
    const { currentClientId } = getState();
    const pieceParams = piece.set('clientUser', {
      id: currentClientId,
    });

    fetch(`/api/stories/${story.get('id')}/pieces`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({ piece: pieceParams.toJS() }),
    }).then(response => {
      return response.json();
    }).then(newPiece => {
      const updatedStory = story.set('pieces', story.get('pieces').push(newPiece)).toJS();
      const entities = normalize(updatedStory, storySchema).entities;
      dispatch(loadEntities(Immutable.fromJS(entities)));
    });
  };
}

export function loadCurrentStory(storyId) {
  return {
    type: actionConstants.LOAD_CURRENT_STORY,
    storyId,
  };
}

export function requestStory(storyId) {
  return function (dispatch) {
    fetch(`/api/stories/${storyId}`).then((response) => {
      return response.json();
    }).then((story) => {
      const entities = normalize(story, storySchema).entities;
      dispatch(loadEntities(Immutable.fromJS(entities)));
      dispatch(loadCurrentStory(story.id)); // TODO: Does this belong here?
    });
  };
}
