import styled from "@emotion/styled";

import * as consts from "consts";

export const Footer = styled.div({
  height: "100px",
  width: "100%",
  textAlign: "center",
  bottom: 0,

  img: {
    width: "150px",
  },
});

export const Description = styled.div({
  color: consts.LIGHTER_GRAY,
});
