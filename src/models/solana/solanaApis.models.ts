import * as anchor from "@project-serum/anchor";
import * as web3 from "@solana/web3.js";

import * as models from "models";

export interface IGetWalletTokenAccountsBody {
  walletKey: web3.PublicKey;
  connection: web3.Connection;
}

export type IGetWalletTokenAccountsResponse = models.ISplAccounts[];

export interface IGetAssociatedTokenAddressMapBody {
  walletKey: web3.PublicKey;
  connection: web3.Connection;
  mints: web3.PublicKey[];
}

export type IGetAssociatedTokenAddressMapResponse = Map<
  string,
  models.ITokenAccount
>;

export interface IGetNftsByOwnerBody {
  owner: web3.PublicKey
}

export interface IGetNftsByOwnerResponse {
  assets: models.INftObject[]
}