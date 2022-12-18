import styled from "@emotion/styled";

import * as consts from "consts";

export const Home = styled.div({
  position: "relative",
  margin: "0 45px",
  paddingTop: "140px",
  textAlign: "left",
  color: consts.BLACK,

  ".nft-section": {
    position: "relative",
    marginBottom: '40px',

    p: {
      maxWidth: "400px",
      borderBottom: "1px solid #f2f2f2",
    },
  },

  ".stenographic-section": {
    display: "flex",
    flexFlow: 'wrap',
    width: "100%",

    '.embed-nft-section': {
      minWidth: "400px",
      width: '50%',
    },

    '.decode-nft-section': {
      minWidth: "400px",
      width: '50%',
    }
  },
});
