import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import { connect } from "react-redux-immutable";
import noop from 'lodash/fp/noop';

import * as gameBoardSelectors from '../dux/gameBoard/selectors';
import * as boardSetting from '../dux/gameBoard/constants/boardSetting';
import * as gameBoardActions from "../dux/gameBoard/actions";

export const CellBox = styled.div`
  background: ${({ data }) => data.isOpened ? '#fff' : '#333'};
  border: 1px solid #ff9900;
  border-radius: 4px;
  float: left;
  height: ${boardSetting.CELL_WIDTH}px;
  width: ${boardSetting.CELL_WIDTH}px;
  color: ${({ data }) => data.isOpened ? '#333' : '#fff'};
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
  line-height: ${boardSetting.CELL_WIDTH}px;
`;

const getCellContent = ({
  isOpened,
  isFlagged,
  isMine,
  numOfSurroundedMines,
}) => {
  if (!isOpened) {
    return isFlagged && '🚩';
  }
  if (isMine) {
    return '💀';
  }
  // if numOfSurroundedMines === 0, display nothing
  return numOfSurroundedMines || "";
};

export const Cell = ({
  position,
  data,
  handleCellClick,
  handleFlagging,
}) => {
  const { isFlagged, isOpened } = data;
  return (
    <CellBox
      data={data}
      onClick={() => isFlagged || isOpened // do nothing
        ? noop
        : handleCellClick(position)
      }
      onContextMenu={event => isOpened // do nothing
        ? noop
        : handleFlagging({ ...position, isFlagged }, event)
      }
    >
      {getCellContent(data)}
    </CellBox>
  );
};

Cell.propTypes = {
  data: PropTypes.shape({
    isFlagged: PropTypes.bool.isRequired,
    isOpened: PropTypes.bool.isRequired,
    isMine:  PropTypes.bool.isRequired,
  }).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  handleCellClick: PropTypes.func.isRequired,
  handleFlagging: PropTypes.func.isRequired,
};

export default connect((state, { position }) => ({
  data: gameBoardSelectors.getCellByPosition(state, { position }),
}), {
  handleCellClick: gameBoardActions.handleCellClick,
  handleFlagging: gameBoardActions.handleFlagging,
})(Cell);
