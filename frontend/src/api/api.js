import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", 
  headers: { "Cache-Control": "no-cache" },
});

export const getTransactions = async (params) => {
  try {
    const response = await api.get("/transactions", { params });
    return response;
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
};


export const getCombinedData = async (params) => {
  try {
    const response = await api.get("/combined", { params });
    return response;
  } catch (error) {
    console.error("Error fetching combined data:", error);
    throw error;
  }
};

export default api;
