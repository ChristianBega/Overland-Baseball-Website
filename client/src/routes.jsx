// src/setup/routes/routes.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ScrollToTop } from "./features/navigation";
import { RoleGuard, AuthRedirect } from "./features/guards";
import { ROLES } from "./features/auth/utils/roles";
import { PageLoader } from "./features/ui";

// Home page is not lazy loaded
import HomePage from "./features/home/pages/HomePage";

// Lazy load all other pages
// const BoostersPage = lazy(() => import("../../pages/boosters/boosters.page"));
const BoostersPage = lazy(() => import("./features/boosters/pages/BoostersPage"));

// const EventsPage = lazy(() => import("../../pages/events/events.page"));
const EventsPage = lazy(() => import("./features/events/pages/EventPage"));
const RosterPage = lazy(() => import("./features/roster/pages/RosterPage"));
// const AlumniPage = lazy(() => import("../../pages/alumni/alumni.page"));
const AlumniPage = lazy(() => import("./features/alumni/pages/AlumniPage"));
const SponsorsPage = lazy(() => import("./features/sponsors/pages/SponsorsPage"));

// const AuthenticationPage = lazy(() => import("../../pages/authentication/authentication.page"));
const AuthenticationPage = lazy(() => import("./features/auth/pages/AuthPage"));

// const PasswordResetPage = lazy(() => import("../../pages/passwordReset/passwordReset.page"));
// Note: PasswordResetPage is now rendered through AuthenticationPage, not directly

// const { Error404Page  } = lazy(() => import("./features/error/pages/404Page"));
const Error404Page = lazy(() => import("./features/error/pages/404Page"));

// Lazy load protected pages
const DocumentsPage = lazy(() => import("./features/documents/pages/DocumentsPage"));
// const AdminDashboardPage = lazy(() => import("../../pages/adminDashboard"));
const AdminDashboardPage = lazy(() => import("./features/admin/pages/AdminDashboard"));
// const ThemeShowcase = lazy(() => import("./pages/themeShowcase/themeShowcase"));
const { ThemeShowcase } = lazy(() => import("./features/themeShowcase"));

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
          <Route path="/authentication/sign-in" element={<AuthRedirect><AuthenticationPage /></AuthRedirect>} />
          <Route path="/authentication/sign-up" element={<AuthRedirect><AuthenticationPage /></AuthRedirect>} />
          <Route path="/authentication/password-reset" element={<AuthenticationPage />} />

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
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}
