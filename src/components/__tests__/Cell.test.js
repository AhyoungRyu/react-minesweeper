import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import gameBoardInitialState from '../../dux/gameBoard/initialState';

import Board from '../Board';
import {
  CellBox,
} from '../Cell';

const mockStore = configureStore([]);

describe('Cell Component', () => {
  let store;
  let component;
  beforeEach(() => {
    store = mockStore({
      gameBoard: gameBoardInitialState,
    });
    component = mount(
      <Provider store={store}>
        <Board />
      </Provider>
    );
  });
  it('successfully renders inner components', () => {
    expect(component.find(CellBox).exists()).toEqual(true);
  });
});
