import { endpoints } from "../constants/apiConstants";
import api from "../auth/api";
export const authService = {
  login(data) {
    return api.post(endpoints.loginRedirect.url, data);
  },
  register(data) {
    return api.post(endpoints.registerRedirect.url, data);
  },
  
};
