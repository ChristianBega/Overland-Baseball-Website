import React, { useContext } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../setup/context/authentication.context";
import { signOutUser } from "../../setup/utils/firebase/authentication";

export default function Account() {
  const { isAuthorized } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleUserSignOut = () => {
    signOutUser();
    navigate("/");
  };

  return (
    <>
      <IconButton sx={{ color: "#fff" }}>
        {isAuthorized ? (
          <Button size="sm" onClick={handleUserSignOut}>
            Sign Out
          </Button>
        ) : (
          <Link to="/authentication/sign-in" style={{ color: "#fff" }}>
            <AccountCircleIcon fontSize="large" />
          </Link>
        )}
      </IconButton>
    </>
  );
}
