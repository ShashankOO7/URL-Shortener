import { endpoints } from "../constants/apiConstants";
import api from "../auth/api";
export const dashboardService = {
    statistics: () => {
        return api.get(endpoints.dashboard.url); //placeholder
    }
}
