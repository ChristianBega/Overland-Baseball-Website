import { BrowserRouter as Router } from "react-router-dom";
import { mainTheme } from "./DesignSystem";
import { ThemeProvider } from "@mui/material";
import { UserContext } from "./setup/context/user.context";
import { useContext } from "react";

// Animation Route - for adding animations with framer motion.
import UnauthorizedRoutes from "./setup/routes/unauthorized/unauthorized.routes";
import AuthorizedRoutes from "./setup/routes/authorized/authorized.routes";
import Navigation from "./components/navigation/navigation.component";
import FooterNavigation from "./components/navigation/footer/footerNavigation.component";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();
function App() {
  const { currentUserProfile } = useContext(UserContext);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={mainTheme}>
        <Router>
          <Navigation />
          {currentUserProfile?.role === "admin" ||
          currentUserProfile?.role === "player" ||
          currentUserProfile?.role === "coach" ||
          currentUserProfile?.role === "parent" ? (
            <AuthorizedRoutes />
          ) : (
            <UnauthorizedRoutes />
          )}

          {/* Error with "react does not recognize show label" - can't find it but somewhere in footer */}
          <FooterNavigation />
        </Router>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
