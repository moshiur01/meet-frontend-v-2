const url = import.meta.env.VITE_BACKEND_URL;
export const getBaseUrl = () => {
  return url || "http://localhost:5000/api/v1";
};
