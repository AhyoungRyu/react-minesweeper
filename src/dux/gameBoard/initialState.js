import * as fi from 'functional-immutable';
import * as gameDifficulty from './constants/gameDifficulty';
import * as gameStatuses from './constants/gameStatus';
import { initBoardData } from './utils';

// Make sure to export an immutable object
export default fi.fromJS({
  status: gameStatuses.WIP,
  difficulty: gameDifficulty.BEGINNER,
  data: initBoardData(gameDifficulty.BEGINNER),
  remainingMines: null,
  // TODO: This is an optional info. Implement if time allows.
  // player: {
  //   name: 'anonymous',
  //   elapsedTime: 0,
  // },
});
