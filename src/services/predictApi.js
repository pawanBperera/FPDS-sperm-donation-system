import axios from "axios";

const predictApi = axios.create({
  baseURL: "http://localhost:8001",
  timeout: 10000,
});

export const getModelInfo = () => predictApi.get("/model/info");

export const trainModel = () => predictApi.post("/train");

export const predict = (payload) => predictApi.post("/predict", payload);
