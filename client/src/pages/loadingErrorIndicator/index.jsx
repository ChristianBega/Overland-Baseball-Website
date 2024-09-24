import React from "react";

const LoadingErrorIndicator = ({ isLoading, error }) => {
  // console.log("line 5", error && error);

  return <>{isLoading && <div>Loading...</div>}</>;
};

export default LoadingErrorIndicator;
