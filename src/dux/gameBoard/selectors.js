import * as fi from 'functional-immutable';
import { createSelector } from 'reselect';
import get from 'lodash/fp/get';
import identity from 'lodash/fp/identity';
import isNull from 'lodash/fp/isNull';

import * as gameStatuses from './constants/gameStatus';
import flow from "lodash/fp/flow";

/**
 * @param {Object} state - The redux state
 * @returns {Object} gameBoard
 */
const getGameBoardState = createSelector(
  get('gameBoard'),
  identity
);

/**
 * @param {Object} state - The redux state
 * @returns {Array} gameBoard.data
 */
export const getGameBoardData = createSelector(
  getGameBoardState,
  fi.get('data')
);

export const getGameBoardDataToJS = createSelector(
  getGameBoardData,
  fi.toJS()
);

/**
 * @param {Object} state - The redux state
 * @returns {Number} gameBoard.remainingMines
 */
export const getNumOfRemainingMines = createSelector(
  getGameBoardState,
  fi.get('remainingMines'),
);

/**
 * @param {Object} state - The redux state
 * @returns {String} gameBoard.status
 */
export const getGameStatus = createSelector(
  getGameBoardState,
  fi.get('status')
);

/**
 * @param {Object} state - The redux state
 * @returns {Boolean} gameBoard.status === "lost"
 */
export const isGameStatusLost = createSelector(
  getGameStatus,
  status => status === gameStatuses.LOST
);

/**
 * @param {Object} state - The redux state
 * @returns {Boolean} gameBoard.status === "won"
 */
export const isGameStatusWon = createSelector(
  getGameStatus,
  status => status === gameStatuses.WON
);

/**
 * @param {Object} state - The redux state
 * @returns {Boolean} gameBoard.status === "won"
 *   || gameBoard.status === "lost"
 */
export const isGameOver = createSelector(
  isGameStatusLost,
  isGameStatusWon,
  (isLost, isWon) => isLost || isWon
);

/**
 * @param {Object} state - The redux state
 * @returns {Object} gameBoard.difficulty
 */
const getGameDifficulty = createSelector(
  getGameBoardState,
  fi.get('difficulty')
);

export const getGameDifficultyToJS = createSelector(
  getGameDifficulty,
  fi.toJS()
);

/**
 * @param {Object} state - The redux state
 * @returns {Number} gameBoard.difficulty.numOfRows
 */
export const getNumOfRows = createSelector(
  getGameDifficulty,
  fi.get('numOfRows')
);

/**
 * @param {Object} state - The redux state
 * @returns {Number} gameBoard.difficulty.mines
 */
export const getTotalNumOfMines = createSelector(
  getGameDifficulty,
  fi.get('mines')
);

/**
 * @param {Object} state - The redux state
 * @returns {Number} gameBoard.remainingMines || gameBoard.difficulty.mines
 */
export const getSafeNumOfRemainingMines = createSelector(
  getNumOfRemainingMines,
  getTotalNumOfMines,
  (remaining, total) => isNull(remaining)
    ? total
    : remaining
);

/**
 * @param {Object} state - The redux state
 * @param {Object} position - the cell position which contains { x, y } set
 * @returns {Object} target cell
 */
export const getCellByPosition = createSelector(
  getGameBoardData,
  (_state, { position }) => position,
  (data, { x, y }) => flow(
    fi.find((_row, rowIdx) => rowIdx === x),
    fi.find((_col, colIdx) => colIdx === y)
  )(data)
);
