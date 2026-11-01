import { useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
}
