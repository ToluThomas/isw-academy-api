import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PostProps } from '../../components/PostItem';
import { client } from '../../api/request';

export interface PostState {
  posts: PostProps[];
  isLoading?: boolean;
  errorMessage?: string;
}

const initialState: PostState = {
  posts: [],
  isLoading: false,
  errorMessage: '',
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await client.get('/Posts');
    return response.data;
  } catch (error) {
    //
  }
});

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<PostProps[]>) => {
        state.isLoading = false;
        state.posts = action.payload;
      },
    );
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default postSlice.reducer;
