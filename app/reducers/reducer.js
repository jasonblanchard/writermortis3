import actionConstants from 'app/actions/constants';
import { combineReducers } from 'redux';
import Immutable from 'immutable';

function someValues(state = [], action) {
  switch (action.type) {
    case actionConstants.ADD_SOME_VALUE:
      return [...state, action.value];
    default:
      return state;
  }
}

function story(state = Immutable.fromJS({}), action) {
  switch (action.type) {
    case actionConstants.LOAD_STORY:
      return action.story;
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
