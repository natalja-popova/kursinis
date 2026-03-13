import { useEffect, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import { API_BASE_URL, userTokenKey } from "@/config";
import style from "./form.module.css";
import { validateJwt } from "@/services/authService";
import PageTemplate from "@/components/Admin/PageTemplate/PageTemplate";
import { handleAxiosError } from "@/utils/handleAxiosErrors";

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPsw, setUserPsw] = useState("");
  const [errorMsg, setErrMsg] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const router = useRouter();

  const login = async () => {
    if (!userEmail || !userPsw) {
      setErrMsg("Visi laukai turi būti užpildyti!");
      return;
    }

    const userData = {
      email: userEmail,
      password: userPsw,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/admin`, {
        ...userData,
      });
      if (response.status === 200) {
        cookie.set(userTokenKey, response.data.jwt);
        router.push("/admin/gallery");
      }
    } catch (error) {
      setErrMsg(handleAxiosError(error));
    } finally {
      setDisableButton(false);
    }
  };
  useEffect(() => {
    const run = async () => {
      const isValid = await validateJwt();

      if (isValid) {
        router.push("/admin/gallery");
        return;
      }
    };
    run();
  }, []);
  return (
    <PageTemplate>
      <div className={style.formWrapper}>
        <h1>Login</h1>
        <input
          type="text"
          value={userEmail}
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
          placeholder="El.pastas"
        />
        <input
          type="password"
          value={userPsw}
          onChange={(e) => {
            setUserPsw(e.target.value);
          }}
          placeholder="Iveskite slaptazodi"
        />
        {errorMsg && <p className={style.error}>{errorMsg}</p>}
        <button onClick={login} disabled={disableButton}>
          Prisijungti
        </button>
        <a>Pamiršau slaptažodį</a>
      </div>
    </PageTemplate>
  );
};

export default LoginPage;
