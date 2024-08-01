import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";

const access_Key = "ScfplWxLcrPS66HToZiMkPYZLwv5n-aJr6U4al7WQZQ";

export const fetchImage = async (query, page = 1, perPage = 10) => {
  try {
    const response = await axios.get("search/photos", {
      params: {
        query,
        page,
        per_page: perPage,
        client_id: access_Key,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};
