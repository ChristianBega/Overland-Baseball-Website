import React, { useContext } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../setup/context/authentication.context";
import { signOutUser } from "../../setup/utils/firebase/authentication";
import LogoutIcon from "@mui/icons-material/Logout";
export default function Account() {
  const { isAuthorized } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleUserSignOut = () => {
    signOutUser();
    navigate("/");
  };

  return (
    <>
      <>
        {isAuthorized ? (
          <IconButton size="large">
            <LogoutIcon />
          </IconButton>
        ) : (
          // <Button variant="contained" color="secondary" size="sm" onClick={handleUserSignOut}>
          //   Sign Out
          // </Button>
          <IconButton size="large">
            <AccountCircleIcon color="secondary" />
            <Link to="/authentication/sign-in" style={{ color: "#fff" }}></Link>
          </IconButton>
        )}
      </>
    </>
  );
}
