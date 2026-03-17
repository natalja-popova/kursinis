import style from "./about.module.css";
import Image from "next/image";
import { useInViewAnimation } from "../../hooks/useInViewAnimation";

const About = () => {
  const { ref, inView } = useInViewAnimation<HTMLElement>();

  return (
    <section
      ref={ref}
      id="Apie"
      className={`${style.about} reveal ${inView ? "revealIn" : ""}`}
    >
      <h2>Apie Mus</h2>
      <div className={style.contentWrapper}>
        <div className={style.textWrapper}>
          <p>
            1998m. buvo ikurtas nardymo klubas &quot;AKVANAUTAS&quot;. Klubas
            yra PASAULINĖS POVANDENINĖS KONFEDERACIJOS( CMAS) narys. Per savo
            egzistavimo laikotarpį paruošė per 700 įvarių lygmenų nardytojų.
            Taip pat siulome ir &quot;NITROX&quot; kursai (nardymas su padidintu
            O2 kiekiu). Klubo nariai dalyvauja fotografijos parodose pateikdami
            povandeninių fotografijų, spausdina straispsnius ir nuotraukas apie
            keliones.
            <br />
            <br />
            Baigusiems nardymo kursus &quot;AKVANAUTAS&quot; organizuoja nardymo
            kelionės. Daug kartų aplankyta Raudonoji jūra, nardyta Mauricijuje,
            Maldyvuose, Fidži, Galapaguose, Prancūzų Polinezijoje, Kroatijoje,
            Filipinuose,Papua Naujuoji Gvinejoje.
          </p>
        </div>
        <Image
          loading="lazy"
          src="/images/apie-mus.jpg"
          alt="Apie Mus"
          width={256}
          height={172}
        />
      </div>
    </section>
  );
};

export default About;
