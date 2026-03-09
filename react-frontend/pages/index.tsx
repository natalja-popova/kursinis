import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import style from "./index.module.css";

const images = [
  { url: "/imgSlider/Bacground-photo1.jpg" },
  { url: "/imgSlider/Bacground-photo2.jpg" },
  { url: "/imgSlider/Bacground-photo3.jpg" },
  { url: "/imgSlider/Bacground-photo5.jpg" },
  { url: "/imgSlider/Bacground-photo6.jpg" },
  { url: "/imgSlider/Bacground-photo7.jpg" },
];

const HomePage = () => {
  const [bg] = useState(() => {
    return images[Math.floor(Math.random() * images.length)];
  });
  const [isMobileMenuOpen, setMobileMenuStatus] = useState(false);
  const navLinks = [
    { url: "/", linkText: "APIE MUS", linkTitle: "Apie mus" },
    { url: "/", linkText: "MOKYMAI", linkTitle: "Mokymai" },
    { url: "/", linkText: "GALERIJA", linkTitle: "Galerija" },
    { url: "/", linkText: "KONTAKTAI", linkTitle: "Kontaktai" },
  ];

  return (
    <div
      className={style.homePage}
      style={{ backgroundImage: `url(${bg.url})` }}
    >
      <header className={style.header}>
        <Link className={style.brandWrapper} href="/">
          <>
            <img className={style.logo} src="/images/akvanautas_logo.png" />
            <h1>POVANDENINIO NARDYMO KLUBAS</h1>
          </>
        </Link>
        <nav>
          <ul>
            {navLinks.map((link) => (
              <li key={link.linkTitle}>
                <Link href={`${link.url}`} title={link.linkTitle}>
                  {link.linkText}
                </Link>
              </li>
            ))}
          </ul>
          <img
            onClick={() => setMobileMenuStatus(!isMobileMenuOpen)}
            className={style.menuMobile}
            src="/images/menu-ico.svg"
            alt="Mobile Menu"
          />
        </nav>
      </header>
      <div
        className={`${style.overlay} ${isMobileMenuOpen ? style.overlayPosition : style.overlayPositionHidden}`}
      >
        <nav>
          <ul>
            {navLinks.map((link) => (
              <li key={link.linkTitle}>
                <Link href={`${link.url}`} title={link.linkTitle}>
                  {link.linkText}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <main className={style.heroBanner}>
        <h3>
          Mūsų sertifikuoti nardymo kursai ir patyrusių instruktorių komanda
          pirmuosius įkvėpimus po vandeniu paverčia ilgalaike aistra ir saugiais
          nuotykiais visame pasaulyje.
        </h3>

        <h2>
          Atrask krištolo skaidrumo rifus, įspūdingą povandeninį pasaulį ir
          keliones, kurios įkvepia.
        </h2>
      </main>

      <footer className={style.footer}>
        <nav>
          <ul>
            {navLinks.map((link) => (
              <li key={link.linkTitle}>
                <Link href={`${link.url}`} title={link.linkTitle}>
                  {link.linkText}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default HomePage;
