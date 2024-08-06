import { useContext } from "react";
import AuthContext from "../../store/auth-context";

// Todo: validate the token on the server
const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;