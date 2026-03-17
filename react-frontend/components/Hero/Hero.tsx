import { useEffect, useState } from "react";
import Link from "next/link";
import style from "./hero.module.css";
const images = [
  { url: "/imgSlider/Bacground-photo2.jpg" },
  { url: "/imgSlider/Bacground-photo3.jpg" },
  { url: "/imgSlider/Bacground-photo5.jpg" },
  { url: "/imgSlider/Bacground-photo6.jpg" },
  { url: "/imgSlider/Bacground-photo7.jpg" },
];
const Hero = () => {
  const [bg, setBg] = useState(images[0]);

  useEffect(() => {
    const random = images[Math.floor(Math.random() * images.length)];
    setBg(random);
  }, []);
  return (
    <section
      className={style.heroBannerWrapper}
      style={{ backgroundImage: `url(${bg.url})` }}
    >
      <div className={style.textWrapper}>
        <h2 className="h3">
          Mūsų sertifikuoti nardymo kursai ir patyrusių instruktorių komanda
          pirmuosius įkvėpimus po vandeniu paverčia ilgalaike aistra ir saugiais
          nuotykiais visame pasaulyje.
        </h2>

        <h3 className="h2">
          Atrask krištolo skaidrumo rifus, įspūdingą povandeninį pasaulį ir
          keliones, kurios įkvepia.
        </h3>

        <div className={style.actions}>
          <Link className={style.primaryBtn} href="#Mokymai">
            Peržiūrėti kursus
          </Link>
          <Link className={style.secondaryBtn} href="#Kontaktai">
            Susisiekti
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
