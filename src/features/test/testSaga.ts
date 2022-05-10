import { takeEvery } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";

export function* log(action: PayloadAction) {
    console.log('Log', action);
}

export default function* testSaga() {
    console.log('test saga');
    yield takeEvery('*', log);
}