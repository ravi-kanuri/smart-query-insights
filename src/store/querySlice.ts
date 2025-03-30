
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { mockQueryProcess } from '@/utils/mockApi';

export interface QueryResult {
  id: string;
  chart: {
    type: 'bar' | 'line' | 'pie' | 'area';
    data: any;
  };
  summary: string;
  timestamp: string;
}

export interface QueryState {
  currentQuery: string;
  history: {
    id: string;
    text: string;
    timestamp: string;
  }[];
  suggestions: string[];
  results: QueryResult[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: QueryState = {
  currentQuery: '',
  history: [],
  suggestions: [
    'Show me monthly sales for the last year',
    'What was our customer growth rate in Q2?',
    'Compare revenue by product category',
    'Show me conversion rates by marketing channel'
  ],
  results: [],
  status: 'idle',
  error: null
};

export const processQuery = createAsyncThunk(
  'query/processQuery',
  async (query: string) => {
    // Simulate API call delay
    const response = await mockQueryProcess(query);
    return response;
  }
);

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setCurrentQuery: (state, action: PayloadAction<string>) => {
      state.currentQuery = action.payload;
    },
    addToHistory: (state, action: PayloadAction<{ id: string; text: string; timestamp: string }>) => {
      state.history = [action.payload, ...state.history];
    },
    clearCurrentQuery: (state) => {
      state.currentQuery = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(processQuery.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(processQuery.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = [action.payload, ...state.results];
        
        // Add to history
        state.history = [
          {
            id: action.payload.id,
            text: state.currentQuery,
            timestamp: new Date().toISOString()
          },
          ...state.history
        ];
        
        // Clear current query
        state.currentQuery = '';
      })
      .addCase(processQuery.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  }
});

export const { setCurrentQuery, addToHistory, clearCurrentQuery } = querySlice.actions;
export default querySlice.reducer;
