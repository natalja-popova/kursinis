import { useEffect, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import { API_BASE_URL, userTokenKey } from "@/config";

import { validateJwt } from "@/services/authService";
import style from "../../components/Header/header.module.css";
import formStyle from "./form.module.css";
import PageTemplate from "@/components/Admin/PageTemplate/PageTemplate";

const AdminIndex = () => {
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
        router.push("/admin/allAlbums");
      }
    } catch (err: any) {
      if (err.response) {
        setErrMsg(err.response.data.message);
      } else if (err.request) {
        setErrMsg("Serveris neatsako.");
      } else {
        setErrMsg("Įvyko klaida.");
      }
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
      <main>
        <div className={formStyle.formWrapper}>
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
            placeholder="Įveskite slaptažodį"
          />
          {errorMsg && <p className={style.error}>{errorMsg}</p>}
          <button onClick={login} disabled={disableButton}>
            Prisijungti
          </button>
        </div>
      </main>
    </PageTemplate>
  );
};

export default AdminIndex;
