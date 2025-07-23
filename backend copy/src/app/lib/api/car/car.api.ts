import { faExternalLinkSquareAlt } from "@fortawesome/free-solid-svg-icons";
import { apiClient } from "../http";

export const getBrands = async () => {
  const response = await apiClient.get("/vechicle/brands");
  return response.data;
};

export const getModels = async (brand: string) => {
  const response = await apiClient.get(`/vechicle/models`, {
    params: {
      brand,
    },
  });
  return response.data;
};
export const getBodies = async (brand: string, model: string) => {
  const response = await apiClient.get("/vechicle/bodies", {
    params: {
      brand,
      model,
    },
  });
  return response.data;
};

export const getCarInJapan = async (
  page: number = 1,
  brand: string = "ALL",
  model: string = "ALL",
  transmission: string = "ALL",
  body: string = "ALL",
  yearFrom: string = "",
  yearTo: string = "",
 
) => {
  const response = await apiClient.get("/vechicle/japan", {
    params: {
      page,
      brand,
      model,
      transmission,
      body,
      yearFrom,
      yearTo,
    
    },
  });
  return response.data;
};
export const getCarInKorea = async (
  page: number = 1,
  brand: string = "",
  model: string = "",
  trim: string = ""
) => {
  const response = await apiClient.get("/vechicle/korea", {
    params: {
      page,
      brand,
      model,
      trim,
    },
  });
  return response.data;
};
