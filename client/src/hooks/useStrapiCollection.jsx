import { useCallback, useEffect, useRef, useState } from "react";
import strapiServices from "../services/strapiServices";

/**
 * Fetch a Strapi collection (or one entry) and track loading/error state. Use for all Strapi reads.
 *
 * @param {string} collection - Strapi collection name, e.g. "schedules".
 * @param {Object} [options={}] - Query options. Precedence: `id`, then `filters`, then all entries.
 * @param {string|number} [options.id] - Fetch one entry by id (`strapiServices.findOne`).
 * @param {Object} [options.filters] - Strapi filters (`strapiServices.findFiltered`).
 * @param {Object} [options.queryParams] - Extra query params (populate, sort, ...) passed to every request.
 * @returns {{data: (Array|Object), loading: boolean, error: (string|null), refetch: function(): Promise<void>}}
 *   `data` starts as `[]` and holds `response.data` (or the raw response). `error` is the error message.
 */
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
