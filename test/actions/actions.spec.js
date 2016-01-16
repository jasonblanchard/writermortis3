import expect from 'expect';
import actionConstants from 'app/actions/constants';
import * as actions from 'app/actions/actions';

describe('actions', () => {
  it('addSomeValue should create ADD_SOME_VALUE action', () => {
    expect(actions.addSomeValue('cats')).toEqual({
      type: actionConstants.ADD_SOME_VALUE,
      value: 'cats',
    });
  });
});
