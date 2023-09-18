import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    if (location?.state?.name !== "fundraisers") {
      window.scrollTo(0, 0);
    } else {
      return;
    }
  }, [location?.state?.name]);
};
