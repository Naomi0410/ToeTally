import { http } from "../utils";

const getProduct = () => {
  return http.get(`/products/getAllProducts`);
};

export default { getProduct };
