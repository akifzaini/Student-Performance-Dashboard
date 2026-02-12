import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

export const getCorrelation = () => API.get("/correlation")
export const getSummary = () => API.get("/summary")
export const getAcademicEffort = () => API.get("/academic-effort")

export default API