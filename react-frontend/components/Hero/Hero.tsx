import { useState } from "react";
import style from "./hero.module.css";
type imageProps = { bgImage: string };
const Hero = ({ bgImage }: imageProps) => {
  return (
    <section
      className={style.heroBannerWarpper}
      style={{ backgroundImage: `url(${bgImage})` }}
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
