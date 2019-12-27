import * as gameStatuses from "../../constants/gameStatus";
import * as gameDifficulty from "../../constants/gameDifficulty";

export const initialData = [
  // 1st row
  [
    {
      x: 0,
      y: 0,
      isMine: false,
      isOpened: false,
      isFlagged: false,
      numOfSurroundedMines: 1
    },
    {
      x: 0,
      y: 1,
      isMine: false,
      isOpened: false,
      isFlagged: false,
      numOfSurroundedMines: 1
    },
    {
      x: 0,
      y: 2,
      isMine: false,
      isOpened: false,
      isFlagged: false,
      numOfSurroundedMines: 0
    }
  ],
  // 2nd row
  [
    {
      x: 1,
      y: 0,
      isMine: true, // 1st mine
      isOpened: false,
      isFlagged: false,
      numOfSurroundedMines: 0
    },
    {
      x: 1,
      y: 1,
      isMine: false,
      isOpened: false,
      isFlagged: false,
      numOfSurroundedMines: 4
    },
    {
      x: 1,
      y: 2,
      isMine: false,
      isOpened: false,
      isFlagged: false,
      numOfSurroundedMines: 2
    }
  ],
  // 3rd row
  [
    {
      x: 2,
      y: 0,
      isMine: true, // 2nd mine
      isOpened: false,
      isFlagged: false,
      numOfSurroundedMines: 0
    },
    {
      x: 2,
      y: 1,
      isMine: true, // 3rd mine
      isOpened: false,
      isFlagged: false,
      numOfSurroundedMines: 0
    },
    {
      x: 2,
      y: 2,
      isMine: true, // 4th mine
      isOpened: false,
      isFlagged: false,
      numOfSurroundedMines: 0
    }
  ]
];

export default {
  status: gameStatuses.WIP,
  data: initialData,
  remainingMines: null,
  difficulty: gameDifficulty.MINI,
};
