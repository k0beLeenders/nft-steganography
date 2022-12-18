import { AnyAction, PayloadAction } from "@reduxjs/toolkit";

import * as models from "models";
import { ISolanaState, initialState } from "./solana.slice";

// Reducers
export const clearWalletInfo = (
  state: ISolanaState,
  action: AnyAction
): void => {
  state.walletInfo = initialState.walletInfo;
};

export const reducers = {
  clearWalletInfo,
};

// wallet accounts
export const getWalletTokenAccounts = {
  pending: (state: ISolanaState, action: AnyAction): void => {
    state.status = "loading";
  },
  fulfilled: (
    state: ISolanaState,
    action: PayloadAction<models.IGetWalletTokenAccountsResponse>
  ): void => {
    state.walletInfo.tokenAccounts = action.payload;
    state.status = "success";
  },
  rejected: (state: ISolanaState, action: AnyAction): void => {
    state.status = "failed";
    state.error = `Failed to get wallet token accounts`;
  },
};

export const getAssociatedTokenAddressMap = {
  pending: (state: ISolanaState, action: AnyAction): void => {
    state.status = "loading";
  },
  fulfilled: (
    state: ISolanaState,
    action: PayloadAction<models.IGetAssociatedTokenAddressMapResponse>
  ): void => {
    state.walletInfo.ataMap = action.payload;
    state.status = "success";
  },
  rejected: (state: ISolanaState, action: AnyAction): void => {
    state.status = "failed";
    state.error = `Failed to get associated token address map`;
  },
};

export const getNftsByOwner = {
  pending: (state: ISolanaState, action: AnyAction): void => {
    state.status = "loading";
  },
  fulfilled: (
    state: ISolanaState,
    action: PayloadAction<models.IGetNftsByOwnerResponse>
  ): void => {
    state.walletInfo.walletNfts = action.payload.assets;
    state.status = "success";
  },
  rejected: (state: ISolanaState, action: AnyAction): void => {
    state.status = "failed";
    state.error = `Failed to get Nft's by owner`;
  },
};

export const extraReducers = {
  getWalletTokenAccounts,
  getAssociatedTokenAddressMap,
};
