import flow from 'lodash/fp/flow';
import compact from 'lodash/fp/compact';
import size from 'lodash/fp/size';
import map from 'lodash/fp/map';
import get from "lodash/fp/get";
import filter from "lodash/fp/filter";
import forEach from "lodash/fp/forEach";
import flatten from 'lodash/fp/flatten';

export const getMineCells = flow(
  map(filter({ isMine: true })),
  flatten, // flatten the 2D array
);

export const getFlaggedCells = flow(
  map(filter({ isFlagged: true })),
  flatten, // flatten the 2D array
);

export const getNumOfFlaggedCells = flow(
  getFlaggedCells,
  size // get size of array
);

export const getNumOfHiddenCells = flow(
  map(filter({ isOpened: false })),
  flatten, // flatten the 2D array
  size // return size of array
);

const getRandomNumber = (limit) =>
  Math.floor((Math.random() * 1000) + 1) % limit;

export const createEmptyArray = (numOfRows, numOfCols) => {
  let data = [];
  for (let i = 0; i < numOfRows; i++) {
    data.push([]);
    for (let j = 0; j < numOfCols; j++) {
      data[i][j] = {
        x: i,
        y: j,
        isMine: false,
        isOpened: false,
        isFlagged: false,
        numOfSurroundedMines: 0,
      };
    }
  }
  return data;
};

export const shuffleGameBoard = (numOfRows, numOfCols, mines) => data => {
  let generatedMines = 0;
  while (generatedMines < mines) {
    const randX = getRandomNumber(numOfCols);
    const randY = getRandomNumber(numOfRows);
    if (!(data[randX][randY].isMine)) {
      data[randX][randY].isMine = true;
      generatedMines ++;
    }
  }
  return data;
};

export const getNumOfSurroundedMines = (numOfRows, numOfCols) => data => {
  for (let i = 0; i < numOfRows; i++) {
    for (let j = 0; j < numOfCols; j++) {
      if (!data[i][j].isMine) {
        data[i][j].numOfSurroundedMines = flow(
          getSurroundItems(i, j), // get all surrounded cells
          filter({ isMine: true }), // filter only mine cells
          size // get length
        )(data);
      }
    }
  }
  return data;
};
export const getSurroundItems = (x, y) => data => compact([ // 'compact' removes any invalid values
  get([y], get([x - 1], data)), // top
  get([y], get([x + 1], data)), // bottom
  get([y + 1], get([x], data)), // right
  get([y - 1], get([x], data)), // left
  get([y + 1], get([x - 1], data)), // top - right
  get([y - 1], get([x - 1], data)), // top - left
  get([y + 1], get([x + 1], data)), // bottom - right
  get([y - 1], get([x + 1], data)), // bottom - left
]);

export const initBoardData = ({ numOfRows, numOfCols, mines }) => flow(
  createEmptyArray,
  shuffleGameBoard(numOfRows, numOfCols, mines),
  getNumOfSurroundedMines(numOfRows, numOfCols)
)(numOfRows, numOfCols);

export const openAllCells = map(
  map(item => ({
    ...item,
    isOpened: true, // only update isOpened
  }))
);

export const openEmptyCells = (x, y) => data => flow(
  getSurroundItems(x, y),
  resultArr => {
    forEach(({
       isFlagged,
       isOpened,
       isMine,
       numOfSurroundedMines,
       ...pos
     }) => {
      if (!isFlagged && !isOpened && (!numOfSurroundedMines || !isMine)) {
        data[x][y] = {
          ...data[x][y],
          isOpened: true,
        };
        if (!numOfSurroundedMines) {
          // traverse every cells recursively
          // and open it if there's no numOfSurroundedMines
          openEmptyCells(pos.x, pos.y)(data);
        }
      }
    }, resultArr);
    return data;
  },
)(data);
