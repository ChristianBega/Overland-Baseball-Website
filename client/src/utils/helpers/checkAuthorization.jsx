import { useNavigate } from "react-router-dom";

export const useCheckAuthorization = () => {
  const navigate = useNavigate();

  const checkAuthorization = (role) => {
    if (role !== "admin" && role !== "coach") {
      alert("You are not authorized to edit this item");
      navigate("/");
      return false;
    }
    return true;
  };

  return checkAuthorization;
};

// We need to remove this eventually and replace with proper authorization check