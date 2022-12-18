import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import { AppLayout } from "components/layout";

import { HomeView } from "./views";

export function Router() {
  return (
    <HashRouter basename={"/"}>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomeView />} />
        </Routes>
      </AppLayout>
    </HashRouter>
  );
}
