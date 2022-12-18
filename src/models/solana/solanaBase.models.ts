import * as web3 from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";

export interface IWalletInfo {
  tokenAccounts: ISplAccounts[];
  ataMap: Map<string, ITokenAccount>;
  walletNfts: INftObject[];
}

export type ISplAccounts = {
  pubkey: web3.PublicKey;
  account: web3.AccountInfo<IParsedTokenAccount>;
};

export type ITokenAccount = {
  pubkey: string;
  ataInfo?: IParsedTokenAccount;
};

export type IParsedTokenAccount = {
  program: string;
  parsed: IParsedTokenAccountData;
  space: number;
};

export type IParsedTokenAccountData = {
  info: IParsedTokenAccountInfo;
  type: string;
};

export type IParsedTokenAccountInfo = {
  isNative: boolean;
  mint: string;
  owner: string;
  state: string;
  tokenAmount: IParsedTokenAccountBalance;
};

export type IParsedTokenAccountBalance = {
  amount: string;
  decimals: number;
  uiAmount: number;
  uiAmountString: string;
};

export type INftObject = {
  mint: string;
  name: string;
  symbol: string;
  image: string;
}