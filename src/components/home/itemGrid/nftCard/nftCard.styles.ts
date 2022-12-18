import styled from "@emotion/styled";

import * as consts from "consts";

export const NftCard = styled.div({
  height: "200px",
  width: "150px",
  marginRight: "35px",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  overflow: "hidden",

  ".nft-img-section": {
    position: "relative",
    width: "100%",

    overflow: "hidden",
    display: "flex",
    justifyContent: "center",

    img: {
      width: "auto",
      height: "150px",
      borderRadius: "8px",
    },
  },

  ".nft-name": {},
});
