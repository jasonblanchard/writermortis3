import actionConstants from 'app/actions/constants';
import { combineReducers } from 'redux';

function someValues(state = [], action) {
  switch (action.type) {
    case actionConstants.ADD_SOME_VALUE:
      return [...state, action.value];
    default:
      return state;
  }
}

function story(state = {}, action) {
  switch (action.type) {
    case actionConstants.ADD_NEW_PIECE:
      const currentStory = state;
      let pieces = currentStory.get('pieces');
      pieces = pieces.push(action.piece);
      return currentStory.set('pieces', pieces);
    default:
      return state;
  }
}

function currentClientId(state = null, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const app = combineReducers({
  someValues,
  story,
  currentClientId,
});

export default app;
