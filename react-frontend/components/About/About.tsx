import style from "./about.module.css";
import Image from "next/image";

const About = () => {
  return (
    <section className={style.about}>
      <h2>Apie Mus</h2>
      <div className={style.contentWrapper}>
        <div className={style.textWrapper}>
          <p>
            1998m. buvo ikurtas nardymo klubas "AKVANAUTAS". Klubas yra
            PASAULINĖS POVANDENINĖS KONFEDERACIJOS( CMAS) narys. Per savo
            egzistavimo laikotarpį paruošė per 700 įvarių lygmenų nardytojų.
            Taip pat siulome ir "NITROX" kursai (nardymas su padidintu O2
            kiekiu). Klubo nariai dalyvauja fotografijos parodose pateikdami
            povandeninių fotografijų, spausdina straispsnius ir nuotraukas apie
            keliones.
          </p>
          <p>
            Baigusiems nardymo kursus "AKVANAUTAS" organizuoja nardymo kelionės.
            Daug kartų aplankyta Raudonoji jūra, nardyta Mauricijuje,
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
