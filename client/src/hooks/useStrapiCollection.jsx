import { useEffect, useState } from "react";
import strapiServices from "../services/strapiServices";

export const useStrapiCollection = (collection, options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        let response;
        const { filters, id, queryParams } = options;

        if (id) {
          response = await strapiServices.findOne(collection, id, queryParams);
        } else if (filters) {
          response = await strapiServices.findFiltered(collection, filters, queryParams);
        } else {
          response = await strapiServices.findMany(collection, queryParams);
        }
        console.log("response", response);
        setData(response.data || response);
      } catch (err) {
        setError(err.message);
        console.error(`Failed to load ${collection}:`, err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [collection, JSON.stringify(options)]);

  return { data, loading, error };
};
