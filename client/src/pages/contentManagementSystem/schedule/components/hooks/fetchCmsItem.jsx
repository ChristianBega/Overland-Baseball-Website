import { useEffect, useState } from "react";
import { fetchCMSItem } from "../../../../../setup/utils/firebase/getItem";

// const = {
//   schedu
// }
export const useFetchScheduleItemsList = (type) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchScheduleItemsList = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchCMSItem(type);
        setData(response);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScheduleItemsList();
  }, []);
  return { data, isLoading };
};
