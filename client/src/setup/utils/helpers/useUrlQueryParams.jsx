import { useLocation } from "react-router-dom";

export const useUrlQueryParams = () => new URLSearchParams(useLocation().search);
