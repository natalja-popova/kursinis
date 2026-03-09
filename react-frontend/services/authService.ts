import axios from "axios";
import cookie from "js-cookie";
import { API_BASE_URL, userTokenKey } from "@/config";

export const validateJwt = async () => {
  const token = cookie.get(userTokenKey);
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/jwt/validate`, {
      headers: {
        Authorization: token,
      },
    });
    if (!token) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};
