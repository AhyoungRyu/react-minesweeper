import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import gameBoardInitialState from '../../dux/gameBoard/initialState';
import * as gameDifficulty from '../../dux/gameBoard/constants/gameDifficulty';

import Board, {
  BoardContainer,
  CellContainer,
  InfoContainer,
  RestartBtn,
} from '../Board';

import { Cell } from '../Cell';

const mockStore = configureStore([]);

describe('Board Component', () => {
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
    expect(component.find(BoardContainer).exists()).toEqual(true);
    expect(component.find(CellContainer).exists()).toEqual(true);
    expect(component.find(InfoContainer).exists()).toEqual(true);
    expect(component.find(RestartBtn).exists()).toEqual(true);
  });
  it('successfully renders the correct number of Cell component inside', () => {
    expect(component.find(Cell).exists()).toEqual(true);
    expect(component.find(Cell).length).toEqual(
      gameDifficulty.BEGINNER.numOfCols * gameDifficulty.BEGINNER.numOfRows
    );
  });
});
