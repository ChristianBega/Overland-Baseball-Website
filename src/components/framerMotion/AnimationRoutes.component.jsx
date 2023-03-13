import React from "react";

import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
// Components
import HomePage from "../../pages/home.page";
import BoostersPage from "../../pages/boosters.page";
import EventsPage from "../../pages/events.page";
import DocumentsPage from "../../pages/documents.page";
import RoosterPage from "../../pages/rooster.page";
import AlumniPage from "../../pages/alumni.page";
import SponsorsPage from "../../pages/sponsors.page";

export default function AnimationRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence initial={true} mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/boosters" element={<BoostersPage />}></Route>
        <Route path="/events" element={<EventsPage />}></Route>
        <Route path="/rooster" element={<RoosterPage />}></Route>
        <Route path="/documents" element={<DocumentsPage />}></Route>
        <Route path="/alumni" element={<AlumniPage />}></Route>
        <Route path="/sponsors" element={<SponsorsPage />}></Route>
      </Routes>
    </AnimatePresence>
  );
}
