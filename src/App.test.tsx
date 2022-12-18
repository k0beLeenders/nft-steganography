import React from "react";
import { render } from "@testing-library/react";
import { AppComp } from "./App";

jest.mock("./components/Identicon", () => {
  return {
    __esModule: true,
    Identicon: () => null,
  };
});

test("renders balances text", () => {
  const { getByText } = render(<AppComp />);
  const linkElement = getByText(/Your balances/i);
  expect(linkElement).toBeInTheDocument();
});
