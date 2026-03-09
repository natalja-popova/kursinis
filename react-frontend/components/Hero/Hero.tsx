import { useState } from "react";
import style from "./hero.module.css";

const Hero = () => {
  const images = [
    { url: "/imgSlider/Bacground-photo1.jpg" },
    { url: "/imgSlider/Bacground-photo2.jpg" },
    { url: "/imgSlider/Bacground-photo3.jpg" },
    { url: "/imgSlider/Bacground-photo5.jpg" },
    { url: "/imgSlider/Bacground-photo6.jpg" },
    { url: "/imgSlider/Bacground-photo7.jpg" },
  ];

  const [bg] = useState(() => {
    return images[Math.floor(Math.random() * images.length)];
  });
  return (
    <section
      className={style.heroBannerWarpper}
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
      </div>
    </section>
  );
};

export default Hero;
