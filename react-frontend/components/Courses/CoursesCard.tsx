import style from "./courseCard.module.css";
import Image from "next/image";

type CourseCardProps = {
  h3: string;
  imgSrc: string;
  text1: string;
  text2: string;
  onRegisterClick?: () => void;
};

const CourseCard = ({
  h3,
  imgSrc,
  text1,
  text2,
  onRegisterClick,
}: CourseCardProps) => {
  return (
    <div className={style.course}>
      <h3>{h3}</h3>

      <Image
        className={style.img}
        src={imgSrc}
        width={350}
        height={233}
        alt={h3}
      />

      <p>{text1}</p>
      <p>{text2}</p>

      <button className="btnCTA" onClick={onRegisterClick}>
        REGISTRUOTIS
      </button>
    </div>
  );
};

export default CourseCard;
