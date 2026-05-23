import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as restController from '../../api/rest/restController';

const TRANSACTIONS_SLICE_NAME = 'transactions';

const initialState = {
  transactions: [],
  isFetching: false,
  error: null,
};

export const getTransactions = createAsyncThunk(
  `${TRANSACTIONS_SLICE_NAME}/get`,
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await restController.getTransaction();
      return data;
    } catch (err) {
      return rejectWithValue({
        data: err?.response?.data ?? 'Gateway Timeout',
        status: err?.response?.status ?? 504,
      });
    }
  }
);

const transactionsSlice = createSlice({
  name: TRANSACTIONS_SLICE_NAME,
  initialState,
  extraReducers: builder => {
    builder.addCase(getTransactions.pending, (state, { payload }) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getTransactions.fulfilled, (state, { payload }) => {
        console.log('payload :>> ', payload);
      state.isFetching = false;
      state.transactions = [...payload];
    });

    builder.addCase(getTransactions.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });
  },
});

const { reducer } = transactionsSlice;

export default reducer;
