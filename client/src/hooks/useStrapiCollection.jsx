import { useCallback, useEffect, useRef, useState } from "react";
import strapiServices from "../services/strapiServices";

export const useStrapiCollection = (collection, options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let response;
      const { filters, id, queryParams } = optionsRef.current;

      if (id) {
        response = await strapiServices.findOne(collection, id, queryParams);
      } else if (filters) {
        response = await strapiServices.findFiltered(collection, filters, queryParams);
      } else {
        response = await strapiServices.findMany(collection, queryParams);
      }
      setData(response.data || response);
    } catch (err) {
      setError(err.message);
      console.error(`Failed to load ${collection}:`, err);
    } finally {
      setLoading(false);
    }
  }, [collection]);

  useEffect(() => {
    loadData();
  }, [collection, JSON.stringify(options)]);

  return { data, loading, error, refetch: loadData };
};
