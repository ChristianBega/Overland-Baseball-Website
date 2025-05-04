import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import FooterNavigation from "./components/footer/newFooterNavigation.component.jsx";
// import Navigation from "./components/navigation/navigation.jsx";
import Navigation from "./features/navigation/components/Navigation.jsx";

import { ThemeToggleContext, ThemeToggleProvider } from "./setup/context/components/themeToggler.context.jsx";
import AppRoutes from "./setup/routes/routes";

const queryClient = new QueryClient();

function App() {
  const { currentTheme } = useContext(ThemeToggleContext);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeToggleProvider theme={currentTheme}>
        <Router>
          <Navigation />
          <AppRoutes />
          <FooterNavigation />
        </Router>
      </ThemeToggleProvider>
    </QueryClientProvider>
  );
}

export default App;
