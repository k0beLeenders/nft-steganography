import { useCallback } from "react";
import * as web3 from "@solana/web3.js";

import { useAppDispatch, useAppSelector } from "state";

import * as models from "models";
import * as solanaThunks from "./solana.thunk";
import * as solanaSlice from "./solana.slice";

export const useSolanaFacade = () => {
  const dispatch = useAppDispatch();

  const solanaData = useAppSelector((state) => state.solana);
  const walletInfo = useAppSelector((state) => state.solana.walletInfo);

  const solanaError = useAppSelector((state) => state.solana.error);
  const solanaStatus = useAppSelector((state) => state.solana.status);

  const getWalletTokenAccounts = useCallback(
    (body: models.IGetWalletTokenAccountsBody) =>
      dispatch(solanaThunks.getWalletTokenAccounts(body)),
    [dispatch]
  );

  const clearWalletInfo = useCallback(
    () => dispatch(solanaSlice.clearWalletInfo()),
    [dispatch]
  );

  const getWalletInfo = useCallback(
    async (walletKey: web3.PublicKey, connection: web3.Connection) => {
      const tokenAccounts = (
        await dispatch(
          solanaThunks.getWalletTokenAccounts({
            walletKey,
            connection,
          })
        )
      ).payload as models.IGetWalletTokenAccountsResponse;

      const mints = tokenAccounts.map(
        (account) =>
          new web3.PublicKey(account.account.data.parsed.info.mint as string)
      );

      dispatch(
        solanaThunks.getAssociatedTokenAddressMap({
          walletKey,
          connection,
          mints,
        })
      );
    },
    [dispatch]
  );

  const getNftsByOwner = useCallback(
    (body: models.IGetNftsByOwnerBody) =>
      dispatch(solanaThunks.getNftsByOwner(body)),
    [dispatch]
  );

  return {
    solanaData,
    walletInfo,
    solanaError,
    solanaStatus,

    getWalletInfo,
    getWalletTokenAccounts,
    getNftsByOwner,
    clearWalletInfo,
  };
};
