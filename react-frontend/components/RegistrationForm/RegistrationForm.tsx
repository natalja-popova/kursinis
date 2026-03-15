import axios from "axios";
import style from "./registrationForm.module.css";
import { useState } from "react";
import { handleAxiosError } from "../../utils/handleAxiosErrors";
import { API_BASE_URL, emailRegex } from "../../config";
import { validateRequired } from "../../utils/utils";
type RegistrationFormProps = {
  selectedLevel: "CMAS1" | "CMAS2" | "CMAS3";
  onChangeLevel?: (level: "CMAS1" | "CMAS2" | "CMAS3") => void;
  onClose?: () => void;
};
const RegistrationForm = ({
  selectedLevel,
  onChangeLevel,
  onClose,
}: RegistrationFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sendStatus, setSendStatus] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [hideForm, setHideForm] = useState(false);

  const sendRegistration = async () => {
    const isValid = validateRequired([email, name]);
    if (!isValid) {
      setErrMsg("Visi laukai turi būti užpildyti");
      return;
    }
    if (!emailRegex.test(email)) {
      setErrMsg("Neteisingas el. pašto adresas");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/courses/register`, {
        course: selectedLevel,
        name: name,
        email: email,
      });
      if (res.status === 200) {
        setSendStatus(res.data.message);
        console.log("res.data.mesage", res.data);
        setHideForm(true);
      }
    } catch (error) {
      setSendStatus(handleAxiosError(error));
    }
  };

  return (
    <div>
      <div className={style.headerWrapper}>
        <h3>Registracija</h3>
        <button className={`btn ${style.closeModal}`} onClick={onClose}>
          X
        </button>
      </div>
      {!hideForm ? (
        <>
          <p>
            Norėdami užsiregistruoti užpildykite šią registracijos formą. <br />
            Registruotis taip pat galite atvykę pas mus adresu Konstitucijos pr.
            25,
            <br />
            <strong>Hobiverse </strong> (Lietuvos Vaikų ir jaunimo centras LVJC)
            arba telefonu +37069811580
          </p>
          <div className={style.formWrapper}>
            <h4>Jusų kontaktiniai duomenys</h4>
            <input
              type="text"
              placeholder="Jusų vardas"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <input
              type="email"
              placeholder="Jusų el. paštas"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {errMsg && <p className="errorMsg">{errMsg}</p>}
            <label>pasirinkti kursą:</label>

            <div className={style.radioButtonsWrapper}>
              <div className={style.radioButton}>
                <label>
                  <input
                    type="radio"
                    name="level"
                    value="CMAS1"
                    checked={selectedLevel === "CMAS1"}
                    onChange={() => onChangeLevel?.("CMAS1")}
                  />
                  <span>CMAS 1</span>
                </label>
                <p>
                  350€ + 50€ nardymo sertifikatas ir nardymo knygelė (nuo 14
                  metų)
                </p>
              </div>
              <div className={style.radioButton}>
                <label>
                  <input
                    type="radio"
                    name="level"
                    value="CMAS2"
                    checked={selectedLevel === "CMAS2"}
                    onChange={() => onChangeLevel?.("CMAS2")}
                  />
                  <span>CMAS 2</span>
                </label>{" "}
                <p>350€ + 50€ nardymo sertifikatas</p>
              </div>
              <div className={style.radioButton}>
                <label>
                  <input
                    type="radio"
                    name="level"
                    value="CMAS3"
                    checked={selectedLevel === "CMAS3"}
                    onChange={() => onChangeLevel?.("CMAS3")}
                  />
                  <span>CMAS 3</span>
                </label>
                <p>
                  350€ + 50€ nardymo sertifikatas ir nardymo knygelė (nuo 8 iki
                  14 metų)
                </p>
              </div>
            </div>
            <button className="btnCTA" onClick={sendRegistration}>
              SIŲSTI
            </button>
            <p className="errorMsg">{sendStatus}</p>
          </div>
        </>
      ) : (
        <p>{sendStatus}</p>
      )}
    </div>
  );
};

export default RegistrationForm;
