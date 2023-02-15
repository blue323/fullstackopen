import axios from "axios";
const baseUrl = "/api/users";

let token = null;

const setUser = (user) => {
  window.localStorage.setItem("user", JSON.stringify(user));
  token = user.token;
};

const getUser = () => {
  const loggedUser = window.localStorage.getItem("user");
  if (loggedUser) {
    const user = JSON.parse(loggedUser);
    token = user.token;
    return user;
  }
  return null;
};

const clearUser = () => {
  localStorage.clear();
  token = null;
};

const getToken = () => token;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// eslint-disable-next-line
export default { setUser, getUser, clearUser, getToken, getAll };
