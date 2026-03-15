import { useState } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import axios from "axios";
import style from "./form.module.css";
import { validateRequired } from "../../utils/utils";
import { API_BASE_URL, emailRegex, pswRegex, userTokenKey } from "../../config";
import PageTemplate from "../../components/Admin/PageTemplate/PageTemplate";
import { handleAxiosError } from "../../utils/handleAxiosErrors";

const RegisterPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setName] = useState("");
  const [userPsw, setUserPsw] = useState("");
  const [errorMsg, setErrMsg] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const router = useRouter();

  const register = async () => {
    const isValid = validateRequired([userEmail, userName, userPsw]);
    if (!isValid) {
      setErrMsg("Ne visi laukai užpildyti");
      return;
    }
    if (!emailRegex.test(userEmail)) {
      setErrMsg("Neteisingas el. pašto adresas");
      return;
    }

    if (!pswRegex.test(userPsw)) {
      setErrMsg(
        "Slaptažodis turi būti ne trumpesnis nei 6 simboliai ir turėti bent vieną didžiąją raidę bei vieną skaitmenį.",
      );
      return;
    }
    setDisableButton(true);
    setErrMsg("");
    const userData = {
      userName: userName,
      email: userEmail,
      password: userPsw,
    };
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/register`, {
        ...userData,
      });
      if (response.status === 201) {
        cookie.set(userTokenKey, response.data.jwt);
        router.push("/admin/gallery");
      }
    } catch (error) {
      setErrMsg(handleAxiosError(error));
    } finally {
      setDisableButton(false);
    }
  };
  return (
    <PageTemplate>
      <div className={style.formWrapper}>
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Name"
          value={userName}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button onClick={register} disabled={disableButton}>
          Registruotis
        </button>
      </div>
    </PageTemplate>
  );
};

export default RegisterPage;
