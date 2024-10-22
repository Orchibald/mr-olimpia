import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Comment } from "../../helpers/types/comment"; 
import { v4 as uuidv4 } from 'uuid'; 

export const fetchComments = createAsyncThunk<Comment[]>(
  'comments/fetchComments',
  async () => {
    const response = await fetch('/api/comments/comments.json');
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    const data = await response.json();
    return data.comments; 
  }
);

export interface CommentsState {
  comments: Comment[];
  status: string;
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  status: 'idle',
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      const newComment: Comment = {
        id: uuidv4(),
        nickname: action.payload.nickname,
        text: action.payload.text,
        likes: 0, 
        date: new Date().toISOString(), 
      };
      state.comments.unshift(newComment); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const { addComment } = commentsSlice.actions;
export default commentsSlice.reducer;
