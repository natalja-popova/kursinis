import axios from "axios";
import cookie from "js-cookie";
import { NextRouter } from "next/router";

import { API_BASE_URL, userTokenKey } from "../config";
import { handleAxiosError } from "../utils/handleAxiosErrors";

export const validateJwt = async () => {
  const token = cookie.get(userTokenKey);
  if (!token) {
    return false;
  }
  try {
    await axios.get(`${API_BASE_URL}/admin/jwt/validate`, {
      headers: {
        Authorization: token,
      },
    });

    return true;
  } catch (error) {
    handleAxiosError(error);
    return false;
  }
};

export const redirectIfSessionExpired = (router: NextRouter) => {
  router.push(`/admin?reason=unauthorized`);
};
