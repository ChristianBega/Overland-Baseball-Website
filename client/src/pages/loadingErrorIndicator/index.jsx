import React from "react";

const LoadingErrorIndicator = ({ isLoading, error }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  return null;
};

export default LoadingErrorIndicator;
