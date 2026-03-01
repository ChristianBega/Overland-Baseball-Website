const STRAPI_URL = import.meta.env.MODE === "development" ? "http://localhost:1337" : import.meta.env.REACT_APP_STRAPI_URL;

class StrapiService {
  // Helper method for API requests
  async request(endpoint, options = {}) {
    try {
      const url = `${STRAPI_URL}/api${endpoint}`;

      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`Strapi request failed: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error("Strapi API error:", error);
      throw error;
    }
  }

  //! Generic methods that work with any collection type
  // Get all items from a collection
  findMany(collectionType, queryParams = {}) {
    const queryString = this.buildQueryString(queryParams);
    return this.request(`/${collectionType}${queryString}`);
  }
  // Get a single item by ID
  findOne(collectionType, id, queryParams = {}) {
    const queryString = this.buildQueryString(queryParams);
    return this.request(`/${collectionType}/${id}${queryString}`);
  }
  // Filter items in a collection
  findFiltered(collectionType, filters = {}, queryParams = {}) {
    // Combine filters with other query params
    const combinedParams = {
      ...queryParams,
      filters,
    };
    const queryString = this.buildQueryString(combinedParams);
    return this.request(`/${collectionType}${queryString}`);
  }
  // Helper to build query strings with proper formatting
  buildQueryString(params = {}) {
    // Start with populate=* as a default if not specified
    if (!params.populate) {
      params.populate = "*";
    }

    // Convert params object to URL query string
    let queryParts = [];

    Object.entries(params).forEach(([key, value]) => {
      // Handle special cases like filters, sort, pagination
      if (key === "filters" && typeof value === "object") {
        // Process nested filters
        Object.entries(value).forEach(([filterKey, filterValue]) => {
          if (typeof filterValue === "object") {
            // Handle operators like $eq, $gt, etc.
            Object.entries(filterValue).forEach(([operator, opValue]) => {
              queryParts.push(`filters[${filterKey}][${operator}]=${encodeURIComponent(opValue)}`);
            });
          } else {
            // Simple equality filter
            queryParts.push(`filters[${filterKey}]=${encodeURIComponent(filterValue)}`);
          }
        });
      } else if (key === "sort" && Array.isArray(value)) {
        // Handle sorting with multiple fields
        queryParts.push(`sort=${value.join(",")}`);
      } else {
        // Handle regular params
        queryParts.push(`${key}=${encodeURIComponent(value)}`);
      }
    });

    return queryParts.length ? `?${queryParts.join("&")}` : "";
  }
  //! Collection-specific convenience methods (optional, for cleaner code elsewhere)
  getEvents(queryParams = {}) {
    return this.findMany("events", queryParams);
  }
  getEventsByType(type) {
    return this.findFiltered("events", { gameType: type });
  }
}

export default new StrapiService();
// getEvent(id, queryParams = {}) {
//   return this.findOne("events", id, queryParams);
// }
// getUpcomingEvents() {
//   const today = new Date().toISOString();
//   return this.findFiltered("events", { startDateTime: { $gte: today } }, { sort: ["startDateTime:asc"] });
// }
// Add other collection types as needed
// Example: Roster methods
// getRoster(queryParams = {}) {
//   return this.findMany("roster", queryParams);
// }
// getPlayerById(id, queryParams = {}) {
//   return this.findOne("roster", id, queryParams);
// }
