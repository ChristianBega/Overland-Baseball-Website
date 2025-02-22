// src/setup/routes/routes.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ScrollToTop } from "../../components/scrollToTop/scrollToTop.component";
import { RoleGuard } from "../../components/guards/roleGuard";
import { ROLES } from "../../setup/utils/constants/roles";
import { PageLoader } from "../../components/reusableComponents/pageLoader";

// Home page is not lazy loaded
import HomePage from "../../pages/unauthorized/home/home.page";

// Lazy load all other pages
const BoostersPage = lazy(() => import("../../pages/unauthorized/boosters/boosters.page"));
const EventsPage = lazy(() => import("../../pages/unauthorized/events/events.page"));
const RosterPage = lazy(() => import("../../pages/unauthorized/roster/roster.page"));
const AlumniPage = lazy(() => import("../../pages/unauthorized/alumni/alumni.page"));
const SponsorsPage = lazy(() => import("../../pages/unauthorized/sponsors/sponsors.page"));
const AuthenticationPage = lazy(() => import("../../pages/unauthorized/authentication/authentication.page"));
const PasswordResetPage = lazy(() => import("../../pages/unauthorized/passwordReset/passwordReset.page"));
const Page404 = lazy(() => import("../../pages/404/404.page"));

// Lazy load protected pages
const DocumentsPage = lazy(() => import("../../pages/authorized/documents/documents.page"));
const AdminDashboardPage = lazy(() => import("../../pages/authorized/adminDashboard"));
const ThemeShowcase = lazy(() => import("../../pages/themeShowcase/themeShowcase"));
const ManagePages = lazy(() => import("../../pages/authorized/managePages/managePages.page"));

//TODO : Loading component for suspended content, build custom overland loading screen component later

export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence initial={true}>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes key={location.pathname} location={location}>
          {/* Public Routes - Accessible to Everyone */}
          <Route path="/" element={<HomePage />} />
          <Route path="/boosters" element={<BoostersPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/roster" element={<RosterPage />} />
          <Route path="/alumni" element={<AlumniPage />} />
          <Route path="/sponsors" element={<SponsorsPage />} />

          {/* Authentication Routes */}
          <Route path="/authentication/sign-in" element={<AuthenticationPage />} />
          <Route path="/authentication/sign-up" element={<AuthenticationPage />} />
          <Route path="/authentication/password-reset" element={<PasswordResetPage />} />

          {/* Admin & Coach Routes */}
          <Route
            path="/dashboard"
            element={
              <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.COACH]}>
                <AdminDashboardPage />
              </RoleGuard>
            }
          />

          <Route
            path="/manage-pages"
            element={
              <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.COACH]}>
                <ManagePages />
              </RoleGuard>
            }
          />

          <Route
            path="/theme-showcase"
            element={
              <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.COACH]}>
                <ThemeShowcase />
              </RoleGuard>
            }
          />

          {/* Team Member Routes (Admin, Coach, Player, Parent) */}
          <Route
            path="/documents"
            element={
              <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.COACH, ROLES.PLAYER, ROLES.PARENT]}>
                <DocumentsPage />
              </RoleGuard>
            }
          />

          {/* 404 Route - Keep Last */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}
