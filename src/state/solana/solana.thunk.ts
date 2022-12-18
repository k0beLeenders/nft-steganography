import { createAsyncThunk } from "@reduxjs/toolkit";

import * as solanaService from "./solana.service";
import * as models from "models";

export const getWalletTokenAccounts = createAsyncThunk(
  "solana/getWalletTokenAccounts",
  async (body: models.IGetWalletTokenAccountsBody) =>
    (await solanaService.getWalletTokenAccounts(
      body
    )) as models.IGetWalletTokenAccountsResponse
);

export const getAssociatedTokenAddressMap = createAsyncThunk(
  "solana/getAssociatedTokenAddressMap",
  async (body: models.IGetAssociatedTokenAddressMapBody) =>
    (await solanaService.getAssociatedTokenAddressMap(
      body
    )) as models.IGetAssociatedTokenAddressMapResponse
);

export const getNftsByOwner = createAsyncThunk(
  "solana/getNftsByOwner",
  async (body: models.IGetNftsByOwnerBody) =>
    (await solanaService.getNftsByOwner(
      body
    )) as models.IGetNftsByOwnerResponse
);