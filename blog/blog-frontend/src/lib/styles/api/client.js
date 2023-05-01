import axios from "../../../../node_modules/axios/index";

const client = axios.create();

export const login = ({ username, password }) => {
  client.post("/api/auth/login", { username, password });
};

export const register = ({ username, password }) => {
  client.post("/api/auth/register", { username, password });
};

export const check = () => {
  client.get("/api/auth/check");
};

export default client;
