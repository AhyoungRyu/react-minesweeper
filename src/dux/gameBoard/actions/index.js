import isEqual from 'lodash/fp/isEqual';
import {
  INIT_BOARD,
  SET_GAME_OVER,
  UPDATE_BOARD,
} from "./types";
import * as gameBoardSelectors from '../selectors';
import * as gameStatuses from '../constants/gameStatus';

import {
  getNumOfFlaggedCells,
  getNumOfHiddenCells,
  getMineCells,
  getFlaggedCells,
  openEmptyCells,
} from "../utils";

// If the user tries to restart the play again,
// initialize the board with initialData
export const handleInitBoard  = () => (dispatch, getState) => {
  const state = getState();
  const difficulty = gameBoardSelectors.getGameDifficultyToJS(state);
  return dispatch({
    type: INIT_BOARD,
    payload: { difficulty }
  });
};

export const handleCellClick  = ({ x, y }) => (dispatch, getState) => {
  const state = getState();
  // Handle the failure case first,
  // if the target cell is mine -> change the gameStatus to WON
  const data = gameBoardSelectors.getGameBoardDataToJS(state);
  if (data[x][y].isMine) {
    return dispatch({
      type: SET_GAME_OVER,
      payload: { data, status: gameStatuses.LOST },
    })
  }
  // Open the target cell
  let updatedData = data;
  updatedData[x][y] = {
    ...updatedData[x][y],
    isOpened: true,
  };
  // Try to open every surrounded empty cells
  if (!updatedData[x][y].numOfSurroundedMines) {
    updatedData = openEmptyCells(x, y)(updatedData);
  }
  // If the number of remaining hidden cells is equal to initial number of mines,
  // it means the user opens every non-mine cells -> change the gameStatus to WON
  const totalNumOfMines = gameBoardSelectors.getTotalNumOfMines(state);
  if (getNumOfHiddenCells(updatedData) === totalNumOfMines) {
    return dispatch({
      type: SET_GAME_OVER,
      payload: {
        data: updatedData,
        status: gameStatuses.WON,
      },
    })
  }
  // If it's not the above case,
  return dispatch({
    type: UPDATE_BOARD,
    payload: {
      updatedData,
      remainingMines: totalNumOfMines - getNumOfFlaggedCells(updatedData),
    }
  });
};

export const handleFlagging = ({ x, y, isFlagged }, event) => (dispatch, getState) => {
  event.preventDefault(); // prevent opening a browser action menus
  const state = getState();
  const updatedData = gameBoardSelectors.getGameBoardDataToJS(state);
  updatedData[x][y] = {
    ...updatedData[x][y],
    isFlagged: !isFlagged,
  };
  const remainingMines = gameBoardSelectors.getSafeNumOfRemainingMines(state);
  if(isEqual(
    getMineCells(updatedData),
    getFlaggedCells(updatedData)
  )) {
    return dispatch({
      type: SET_GAME_OVER,
      payload: {
        data: updatedData,
        status: gameStatuses.WON,
        remainingMines: remainingMines - 1,
      },
    })
  }
  return dispatch({
    type: UPDATE_BOARD,
    payload: {
      updatedData,
      remainingMines: isFlagged
        ? remainingMines + 1
        : remainingMines - 1
    }
  });
};
