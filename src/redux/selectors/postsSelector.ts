import { RootState } from '../store';

export const postsSelector = (reduxState: RootState) => reduxState.posts;
