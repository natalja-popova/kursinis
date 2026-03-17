import style from "./about.module.css";
import Image from "next/image";
import { useInViewAnimation } from "../../hooks/useInViewAnimation";

const Medicine = () => {
  const { ref, inView } = useInViewAnimation<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`${style.medicine} reveal ${inView ? "revealIn" : ""}`}
    >
      <h2> Nardymo gydytoja </h2>
      <div className={style.contentWrapper}>
        <Image
          loading="lazy"
          src="/images/gydytoja2.jpg"
          alt=" Nardymo gydytoja  "
          width={272}
          height={185}
        />
        <div className={style.textWrapper}>
          <p>
            Mūsų klube dirba vienintelė nardymo gydytoja Lietuvoje - Rūta
            Dovidaitienė
            <br />
            <br />
            Ji kiekvienais metais dalyvauja tarptautiniuose nardymo medicinos
            kongresose ir kursose!
            <br />
            <br />
            Jei turite klausimų, rašykite jai el. paštu:{" "}
            <a href="mailto:rutadov@yahoo.com">rutadov@yahoo.com </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Medicine;
