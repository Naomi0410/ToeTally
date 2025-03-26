import { http } from "../utils";

const getUser = (id) => {
  return http.get(`/auth/getUser/${id}`);
};


export default {getUser}