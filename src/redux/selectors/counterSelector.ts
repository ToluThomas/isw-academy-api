import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const counterSelector = (reduxState: RootState) => reduxState.counter;

export const evenSelector = createSelector(
  [counterSelector],
  state => state.value % 2 === 0,
);
