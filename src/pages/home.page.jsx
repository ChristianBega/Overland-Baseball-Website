import { Button } from "@mui/material";
import React from "react";

export default function HomePage() {
  return (
    <div>
      <Button fullWidth size="small">
        Sign up now
      </Button>
      <Button>Sign up now</Button>
      <Button fullWidth size="large">
        Sign up now
      </Button>
      <Button fullWidth size="box">
        Sign up now
      </Button>
      <Button fullWidth size="circle">
        Sign up now
      </Button>
    </div>
  );
}
