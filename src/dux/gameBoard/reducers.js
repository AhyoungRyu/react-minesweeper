import { handleActions } from 'redux-actions';
import * as fi from 'functional-immutable';
import flow from 'lodash/fp/flow';

import { openAllCells, initBoardData } from "./utils";
import initialState from './initialState';

import {
  UPDATE_BOARD,
  SET_GAME_OVER,
  INIT_BOARD,
} from './actions/types';

export default handleActions({
  [INIT_BOARD]: (_state, { payload: { difficulty } }) => flow(
    fi.set("difficulty", fi.fromJS(difficulty)),
    fi.set("data", fi.fromJS(initBoardData(difficulty))),
  )(initialState),
  [SET_GAME_OVER]: (state, { payload: { data, status, remainingMines } }) => flow(
    // Open every cells and finish the game
    fi.set("status", status),
    fi.set("remainingMines", remainingMines),
    fi.set("data", fi.fromJS(openAllCells(data)))
  )(state),
  [UPDATE_BOARD]: (state, { payload: { updatedData, remainingMines } }) => flow(
    fi.set("data", fi.fromJS(updatedData)),
    fi.set("remainingMines", remainingMines)
  )(state),
}, initialState);
