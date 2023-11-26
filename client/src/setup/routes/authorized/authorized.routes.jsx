import React from "react";

import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ScrollToTop } from "../../../components/scrollToTop/scrollToTop.component";
import PlayerRosterPage from "../../../pages/authorized/playerRoster/playerRoster.page";
import DocumentsPage from "../../../pages/unauthorized/documents/documents.page";

export default function AuthorizedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence initial={true}>
      <ScrollToTop />
      <Routes key={location.pathname} location={location}>
        <Route path="*" element={<Page404 />} />
        <Route path="/coach/player-roster" element={<PlayerRosterPage />}></Route>
        <Route path="/documents" element={<DocumentsPage />}></Route>
      </Routes>
    </AnimatePresence>
  );
}
