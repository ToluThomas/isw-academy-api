import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const counterSelector = (state: RootState) => state.counter;

export const evenSelector = createSelector([counterSelector], state => state.value % 2 === 0)

