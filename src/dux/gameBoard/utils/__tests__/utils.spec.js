import flatten from 'lodash/fp/flatten';
import size from 'lodash/fp/size';
import flow from 'lodash/fp/flow';

import {
  getMineCells,
  getSurroundItems,
  getNumOfFlaggedCells,
  getNumOfHiddenCells,
  initBoardData,
  openAllCells,
} from '../index';
import mockData from './mock.data';

describe('Utils', () => {
  it('should generate 9 cells in total with initBoardData', () => {
    expect(
      flow(
        initBoardData,
        flatten,
        size
      )(mockData.difficulty)
    ).toEqual(9);
  });
  it('should have 4 mine cells', () => {
    expect(getMineCells(mockData.data).length).toEqual(4);
  });
  it('should have 0 flagged cells in initial data set', () => {
    expect(getNumOfFlaggedCells(mockData.data)).toEqual(0);
  });
  it('should have all hidden cells in initial data set', () => {
    expect(getNumOfHiddenCells(mockData.data)).toEqual(9);
  });
  it('should return correct length of surrounded elements array', () => {
    // 1st row
    expect(getSurroundItems(0, 0)(mockData.data).length).toEqual(3);
    expect(getSurroundItems(0, 1)(mockData.data).length).toEqual(5);
    expect(getSurroundItems(0, 2)(mockData.data).length).toEqual(3);
    // 2nd row
    expect(getSurroundItems(1, 0)(mockData.data).length).toEqual(5);
    expect(getSurroundItems(1, 1)(mockData.data).length).toEqual(8);
    expect(getSurroundItems(1, 2)(mockData.data).length).toEqual(5);
    // 3rd row
    expect(getSurroundItems(2, 0)(mockData.data).length).toEqual(3);
    expect(getSurroundItems(2, 1)(mockData.data).length).toEqual(5);
    expect(getSurroundItems(2, 2)(mockData.data).length).toEqual(3);
  });
  it('should make all cell opened with openAllCells', () => {
    expect(
      flow(
        openAllCells,
        getNumOfHiddenCells
      )(mockData.data)
    ).toEqual(0);
  });
});
