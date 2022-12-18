import styled from "@emotion/styled";

import * as colors from "consts/colors.consts";
import * as consts from "consts";

export const PageContent = styled.div({});

export const ContentLayout = styled.div({
  flex: 1,
});

export const InnerContent = styled.div({
  color: colors.WHITE,
  // minHeight: "calc(100vh + 1px)",
  overflowX: "hidden",

  [consts.mediaQuery.tablet]: {
    padding: "0 20px",
  },
});
