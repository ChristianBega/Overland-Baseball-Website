import React, { useEffect } from "react";
import TimeLine from "../components/alumni/TimeLine";

export default function AlumniPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
    <TimeLine/>
    </>
  );
}
