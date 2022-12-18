import { createSlice, Reducer } from "@reduxjs/toolkit";
import * as web3 from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";

import * as models from "models";
import * as solanaThunks from "./solana.thunk";
import * as solanaReducers from "./solana.reducers";

export interface ISolanaState {
  status: models.IApiStatus;
  error: models.IError;
  walletInfo: models.IWalletInfoState;
}

export const initialState: ISolanaState = {
  status: "idle",
  error: null,
  walletInfo: {
    tokenAccounts: [],
    ataMap: new Map<string, models.ITokenAccount>(),
    walletNfts: [],
  },
};

const solanaSlice = createSlice({
  name: "solana",
  initialState,
  reducers: solanaReducers.reducers,
  extraReducers: (builder) => {
    builder
      // wallet accounts
      .addCase(solanaThunks.getWalletTokenAccounts.pending, (state, action) =>
        solanaReducers.getWalletTokenAccounts.pending(state, action)
      )
      .addCase(solanaThunks.getWalletTokenAccounts.fulfilled, (state, action) =>
        solanaReducers.getWalletTokenAccounts.fulfilled(state, action)
      )
      .addCase(solanaThunks.getWalletTokenAccounts.rejected, (state, action) =>
        solanaReducers.getWalletTokenAccounts.rejected(state, action)
      )
      .addCase(
        solanaThunks.getAssociatedTokenAddressMap.pending,
        (state, action) =>
          solanaReducers.getAssociatedTokenAddressMap.pending(state, action)
      )
      .addCase(
        solanaThunks.getAssociatedTokenAddressMap.fulfilled,
        (state, action) =>
          solanaReducers.getAssociatedTokenAddressMap.fulfilled(state, action)
      )
      .addCase(
        solanaThunks.getAssociatedTokenAddressMap.rejected,
        (state, action) =>
          solanaReducers.getAssociatedTokenAddressMap.rejected(state, action)
      )
      .addCase(
        solanaThunks.getNftsByOwner.pending,
        (state, action) =>
          solanaReducers.getNftsByOwner.pending(state, action)
      )
      .addCase(
        solanaThunks.getNftsByOwner.fulfilled,
        (state, action) =>
          solanaReducers.getNftsByOwner.fulfilled(state, action)
      )
      .addCase(
        solanaThunks.getNftsByOwner.rejected,
        (state, action) =>
          solanaReducers.getNftsByOwner.rejected(state, action)
      );
  },
});

export const { clearWalletInfo } = solanaSlice.actions;

export default solanaSlice.reducer as Reducer<ISolanaState>;
