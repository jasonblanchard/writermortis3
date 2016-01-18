import actionConstants from 'app/actions/constants';
import { combineReducers } from 'redux';
import Immutable from 'immutable';

// function story(state = Immutable.fromJS({}), action) {
//   switch (action.type) {
//     case actionConstants.LOAD_STORY:
//       return action.story;
//     case actionConstants.ADD_NEW_PIECE:
//       const currentStory = state;
//       let pieces = currentStory.get('pieces');
//       pieces = pieces.push(action.piece);
//       return currentStory.set('pieces', pieces);
//     default:
//       return state;
//   }
// }

function currentStoryId(state = null, action) {
  switch (action.type) {
    case actionConstants.LOAD_CURRENT_STORY:
      return action.storyId;
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

function entities(state = Immutable.fromJS({ story: {}, piece: {}, clientUser: {} }), action) {
  switch (action.type) {
    case actionConstants.LOAD_ENTITIES:
      return state.mergeDeep(action.entities);
    default:
      return state;
  }
}

const app = combineReducers({
  currentClientId,
  currentStoryId,
  entities,
});

export default app;
