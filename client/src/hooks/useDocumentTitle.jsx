import { useEffect } from "react";

/**
 * Custom hook that sets the browser tab / search-result title for the current page
 * @param {string} title - Full document title, e.g. "Events | Overland Baseball"; a falsy value leaves the title unchanged
 * @returns {void}
 *   Runs on mount and whenever `title` changes. It does not restore the previous title on unmount,
 *   because the next route sets its own. `client/index.html` keeps "Overland Baseball" as the no-JS default.
 */
const useDocumentTitle = (title) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
};

export default useDocumentTitle;
