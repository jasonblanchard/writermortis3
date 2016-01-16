import expect from 'expect';
import app from 'app/reducers/reducer';
import actionConstants from 'app/actions/constants';

describe('App reducer', () => {
  it('should handle initial state', () => {
    expect(app(undefined, {})).toEqual({
      someValues: [],
    });
  });

  it('should handle ADD_SOME_VALUE', () => {
    expect(
      app(undefined, {
        type: actionConstants.ADD_SOME_VALUE,
        value: 'cats',
      })
    ).toEqual({
      someValues: ['cats'],
    });
  });
});
