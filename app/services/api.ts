import axios from "axios";

const API = axios.create({
  baseURL: "https://seva-backend-qfmf.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;