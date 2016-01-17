import { combineReducers } from 'redux';
import actionConstants from 'app/actions/constants';

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
    default:
      return state;
  }
}

const app = combineReducers({
  someValues,
  story,
});

export default app;
