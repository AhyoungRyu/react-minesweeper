// This file composes dux together by combining sagas
import { fork } from 'redux-saga/effects';

import gameBoard from './gameBoard/sagas';

export default function* rootSaga() {
  yield fork(gameBoard);
}
