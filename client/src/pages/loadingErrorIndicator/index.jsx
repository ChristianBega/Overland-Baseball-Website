import React from "react";

const LoadingErrorIndicator = ({ isLoading, error }) => {
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error fetching data: ${error} </div>}
    </>
  );
};

export default LoadingErrorIndicator;
