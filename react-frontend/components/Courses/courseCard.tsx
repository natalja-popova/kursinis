import style from "./courses.module.css";
import Image from "next/image";

const courseCard = () => {
  return (
    <div className={style.course}>
      <h3>CMAS 1* nardymo kursai</h3>
      <Image
        className={style.img}
        src="/images/courses/cmas-1-kursai.png"
        width={350}
        height={233}
        alt="CMAS 1* nardymo kursai"
      />

      <p>350€ + 50€ nardymo sertifikatas ir nardymo knygelė</p>
      <p>Nuo 14 metų</p>

      <button>Registruotis</button>
    </div>
  );
};

export default courseCard;
