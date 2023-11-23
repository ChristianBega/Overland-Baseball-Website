import React from "react";

import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
// Components
import HomePage from "../../pages/home/home.page";
import BoostersPage from "../../pages/boosters/boosters.page";
import EventsPage from "../../pages/events/events.page";
import DocumentsPage from "../../pages/documents/documents.page";
import RosterPage from "../../pages/roster/roster.page";
import AlumniPage from "../../pages/alumni/alumni.page";
import SponsorsPage from "../../pages/sponsors/sponsors.page";
import AuthenticationPage from "../../pages/authentication/authentication.page";
import { ScrollToTop } from "../../components/scrollToTop/scrollToTop.component";

export default function AnimationRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence initial={true}>
      <ScrollToTop />
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/boosters" element={<BoostersPage />}></Route>
        <Route path="/events" element={<EventsPage />}></Route>
        <Route path="/roster" element={<RosterPage />}></Route>
        <Route path="/documents" element={<DocumentsPage />}></Route>
        <Route path="/alumni" element={<AlumniPage />}></Route>
        <Route path="/sponsors" element={<SponsorsPage />}></Route>
        <Route path="/boosters" element={<BoostersPage />}></Route>
        <Route path="/authentication" element={<AuthenticationPage />}></Route>
      </Routes>
    </AnimatePresence>
  );
}
