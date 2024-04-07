import React from "react";

import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ScrollToTop } from "../../../components/scrollToTop/scrollToTop.component";
import PlayerRosterPage from "../../../pages/authorized/playerRoster/playerRoster.page";
import DocumentsPage from "../../../pages/authorized/documents/documents.page";
import HomePage from "../../../pages/unauthorized/home/home.page";
import BoostersPage from "../../../pages/unauthorized/boosters/boosters.page";
import EventsPage from "../../../pages/unauthorized/events/events.page";
import RosterPage from "../../../pages/unauthorized/roster/roster.page";
import AlumniPage from "../../../pages/unauthorized/alumni/alumni.page";
import SponsorsPage from "../../../pages/unauthorized/sponsors/sponsors.page";
import AuthenticationPage from "../../../pages/unauthorized/authentication/authentication.page";
import PasswordResetPage from "../../../pages/unauthorized/passwordReset/passwordReset.page";
import Page404 from "../../../pages/404/404.page";
import AdminDashboardPage from "../../../pages/authorized/adminDashboard";
import CMSEditPage from "../../../pages/contentManagementSystem/editPage";

export default function AuthorizedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence initial={true}>
      <ScrollToTop />
      <Routes key={location.pathname} location={location}>
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/coach/player-roster" element={<PlayerRosterPage />}></Route>
        <Route path="/documents" element={<DocumentsPage />}></Route>
        {/* Previous Unauthorized routes */}
        <Route path="/boosters" element={<BoostersPage />}></Route>
        <Route path="/events" element={<EventsPage />}></Route>
        <Route path="/roster" element={<RosterPage />}></Route>
        <Route path="/alumni" element={<AlumniPage />}></Route>
        <Route path="/sponsors" element={<SponsorsPage />}></Route>
        <Route path="/boosters" element={<BoostersPage />}></Route>
        <Route path="/authentication/sign-in" element={<AuthenticationPage />}></Route>
        <Route path="/authentication/sign-up" element={<AuthenticationPage />}></Route>
        <Route path="/authentication/password-reset" element={<PasswordResetPage />}></Route>
        <Route path="/dashboard" element={<AdminDashboardPage />}></Route>
        <Route path="/cms-edit-page" element={<CMSEditPage />}></Route>
      </Routes>
    </AnimatePresence>
  );
}
