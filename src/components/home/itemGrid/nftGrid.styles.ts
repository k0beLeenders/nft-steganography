import styled from "@emotion/styled";

import * as consts from "consts";

export const NftGrid = styled.div({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  justifyContent: "center",
  border: `2px solid ${consts.BLACK}`,
  borderRadius: "10px",
  padding: "12px",

  ".nft-items": {
    display: "flex",
    flexWrap: "wrap",
  },

  ".pagination": {
    justifyContent: 'center',
    display: "flex",
    gap: 10,
    listStyle: "none",
  },
});
