import styled from "@emotion/styled";

import * as colors from "consts/colors.consts";

export const PDesc = styled.p<{ mb?: boolean; lg?: boolean }>(
  ({ mb = true, lg = true }) => ({
    fontSize: lg ? "21px" : "16px",
    fontWeight: 300,
    marginBottom: mb ? "2.0rem" : "0rem",
    lineHeight: "150%",
    color: colors.LIGHT_GRAY,
  })
);

export const H2 = styled.h2({
  fontSize: '35px',
  marginBottom: '6px',
  fontWeight: 700,
})

export const H4 = styled.h4({
  fontSize: '20px',
  marginBottom: '2px',
  fontWeight: 700,
})

export const P = styled.h2({
  fontSize: '18px',
  fontWeight: 500,
})