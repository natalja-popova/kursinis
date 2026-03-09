import SimpleImageSlider from "react-simple-image-slider";
import style from "./index-copy.module.css";
import { useCallback, useState } from "react";
import Link from "next/link";
const images = [
  { url: "imgSlider/Bacground-photo1.jpg" },
  { url: "imgSlider/Bacground-photo2.jpg" },
  { url: "imgSlider/Bacground-photo3.jpg" },
  { url: "imgSlider/Bacground-photo5.jpg" },
  { url: "imgSlider/Bacground-photo6.jpg" },
  { url: "imgSlider/Bacground-photo7.jpg" },
];

const HomePage = () => {
  const navLinks = [
    { url: "/", linkText: "TITULINIS", linkTitle: "Titulinis" },
    { url: "/", linkText: "APIE MUS", linkTitle: "Apie mus" },
    { url: "/", linkText: "MOKYMAI", linkTitle: "Mokymai" },
    { url: "/", linkText: "GALERIJA", linkTitle: "Galerija" },
    { url: "/", linkText: "KONTAKTAI", linkTitle: "Kontaktai" },
  ];

  return (
    <div className={style.homePage}>
      <header className={style.header}>
        <img className={style.logo} src="/images/akvanautas_logo.png" />
        <nav>
          <h1>POVANDENINIO NARDYMO KLUBAS</h1>
          <ul>
            {navLinks.map((link) => (
              <li key={link.url}>
                <Link href={`/${link.url}`} title={`${link.linkTitle}`}>
                  {link.linkText}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className={style.heroBanner}>
        <h3>
          Mūsų sertifikuoti nardymo kursai ir patyrusių instruktorių komanda
          pirmuosius įkvėpimus po vandeniu paverčia ilgalaike aistra ir saugiais
          nuotykiais visame pasaulyje.
        </h3>
        <h2>
          {" "}
          Atrask krištolo skaidrumo rifus, įspūdingą povandeninį pasaulį ir
          keliones, kurios įkvepia.
        </h2>
      </main>
      <div className={style.sliderWrapper}>
        <SimpleImageSlider
          width={"100vw"}
          height={"100vh"}
          images={images}
          showBullets={true}
          showNavs={false}
          autoPlay={true}
          slideDuration={5}
        />
      </div>
      <footer className={style.footer}>
        <nav>
          <ul>
            {navLinks.map((link) => (
              <li key={link.url}>
                <Link href={`/${link.url}`} title={`${link.linkTitle}`}>
                  {link.linkText}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </footer>
      <main></main>
    </div>
  );
};

export default HomePage;
