import React from "react";

import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

export default function AnimationRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence initial={true} mode="wait">
      <Routes key={location.pathname} location={location}>
        
        <Route path="/" element={""}></Route>
      </Routes>
    </AnimatePresence>
  );
}
