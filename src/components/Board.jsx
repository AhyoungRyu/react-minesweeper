import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux-immutable';
import map from 'lodash/fp/map';

import * as gameBoardSelectors from '../dux/gameBoard/selectors';
import * as boardSetting from '../dux/gameBoard/constants/boardSetting';
import * as gameBoardStatuses from '../dux/gameBoard/constants/gameStatus';
import * as gameBoardActions from "../dux/gameBoard/actions";

import Cell from './Cell';

export const BoardContainer = styled.div`
  max-width: ${({ boardWidth }) => boardWidth * boardSetting.CELL_WIDTH + 40}px;
  padding: 20px;
  background: #ff9900;
  margin: 0 auto;
  overflow: auto;
`;

export const InfoContainer = styled.div`
  color: #fff;
  font-size: 16px;
  padding-bottom: 20px;
`;

export const CellContainer = styled.div`
  margin: 0 auto;
  padding-left: 10px;
`;

export const RestartBtn = styled.button`
  background-color: #ffffff;
  border-radius: 6px;
  border: 1px solid #dcdcdc;
  color: #333;
  font-size: 14px;
  padding: 6px 18px;
  float: right;
  cursor: pointer;
  margin-top: -5px;
`;

const renderBoard = map(row =>
  map(({ x, y }) => (
    <Cell
      key={`${x}_${y}_${row.length}`}
      position={{ x, y }}
    />
  ), row)
);

const Board = ({
  data,
  remainingMines,
  boardWidth,
  gameStatus,
  isGameOver,
  handleInitBoard,
}) => {
  useEffect(() => {
    if (isGameOver) {
      alert(`You ${gameStatus}! Click 'Restart' button to play again.`);
    }
  }, [isGameOver, gameStatus]);
  return (
    <BoardContainer boardWidth={boardWidth}>
      <InfoContainer>
        <span>Remaining mines: {remainingMines}</span>
        <RestartBtn onClick={handleInitBoard}>
          Restart
        </RestartBtn>
      </InfoContainer>
      <CellContainer>
        {renderBoard(data)}
      </CellContainer>
    </BoardContainer>
  );
};

Board.propTypes = {
  data: PropTypes.arrayOf(PropTypes.array),
  remainingMines: PropTypes.number,
  boardWidth: PropTypes.number,
  gameStatus: PropTypes.string,
  isGameOver: PropTypes.bool,
  handleInitBoard: PropTypes.func,
};

Board.defaultProps = {
  data: [],
  remainingMines: 0,
  boardWidth: 0,
  gameStatus: gameBoardStatuses.WIP,
  isGameOver: false,
};

export default connect((state) => ({
  remainingMines: gameBoardSelectors.getSafeNumOfRemainingMines(state),
  gameStatus: gameBoardSelectors.getGameStatus(state),
  isGameOver: gameBoardSelectors.isGameOver(state),
  data: gameBoardSelectors.getGameBoardData(state),
  boardWidth: gameBoardSelectors.getNumOfRows(state),
}), {
  handleInitBoard: gameBoardActions.handleInitBoard,
})(Board);
