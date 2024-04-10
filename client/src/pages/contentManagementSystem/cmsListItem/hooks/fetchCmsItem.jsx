import { useEffect, useState } from "react";
import { fetchCMSItems } from "../../../../setup/utils/firebase/getItem";

// const = {
//   schedu
// }
export const useFetchCMSItemsList = (type) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCMSItemsList = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchCMSItems(type);
        setData(response);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCMSItemsList();
  }, [type]);
  return { data, isLoading, error };
};
