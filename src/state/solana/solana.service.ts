import axios from "axios";

import * as models from "models";
import * as consts from "consts";
import * as actions from "actions";

export const getWalletTokenAccounts = async (
  body: models.IGetWalletTokenAccountsBody
): Promise<models.IGetWalletTokenAccountsResponse> =>
  (
    await body.connection.getParsedTokenAccountsByOwner(
      body.walletKey,
      {
        programId: consts.TOKEN_PROGRAM,
      },
      "single"
    )
  ).value;

export const getAssociatedTokenAddressMap = async (
  body: models.IGetAssociatedTokenAddressMapBody
): Promise<models.IGetAssociatedTokenAddressMapResponse> => {
  const ataMap = new Map<string, models.ITokenAccount>();
  let mints = body.mints;

  for (const mint of mints) {
    const ataAccount = await actions.getAssociatedTokenAccount(
      mint,
      body.walletKey,
      body.connection
    );

    ataMap.set(mint.toString(), ataAccount as models.ITokenAccount);
  }
  return ataMap;
};

export const getNftsByOwner = async (
  body: models.IGetNftsByOwnerBody
): Promise<models.IGetNftsByOwnerResponse> =>
  (await axios.get(`https://api.lollipop.xyz/v1/wallet-info/${body.owner}`)).data.nfts;