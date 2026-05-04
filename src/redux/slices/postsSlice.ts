import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostProps } from '../../components/molecules/PostItem';
import { client } from '../../helpers/api/request';

export interface PostsState {
  posts: PostProps[];
  isLoading?: boolean;
  errorMessage?: string;
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  errorMessage: '',
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await client.get('/posts');
    return response.data;
  } catch (error) {}
});

export const postsSlice = createSlice({
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

export default postsSlice.reducer;
