import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { useSolanaFacade } from "state/solana";

export interface IWalletAccountsContext {}

const WalletAccountsContext = createContext<IWalletAccountsContext>({});

export const useWalletAccountsContext = () => {
  const context = useContext(WalletAccountsContext);

  return context;
};

export const WalletAccountsContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const { getWalletInfo, clearWalletInfo } = useSolanaFacade();

  useEffect(() => {
    if (!connected || !publicKey) {
      clearWalletInfo();
    }
  }, [connection, connected, publicKey, clearWalletInfo]);

  useEffect(() => {
    if (publicKey) {
      // getWalletInfo(publicKey, connection);
    }
  }, [publicKey, connection, getWalletInfo]);

  useEffect(() => {
    if (connection && publicKey) {
      // const tokenSubID = connection.onAccountChange(
      //   publicKey,
      //   async () => {
      //     await getWalletInfo(publicKey, connection);
      //   },
      //   "finalized"
      // );

      // return () => {
      //   connection.removeAccountChangeListener(tokenSubID);
      // };
    }
  }, [connection, connected, publicKey, getWalletInfo]);

  return (
    <WalletAccountsContext.Provider value={{}}>
      {children}
    </WalletAccountsContext.Provider>
  );
};
