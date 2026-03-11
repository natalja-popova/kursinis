import { useState } from "react";
import style from "./header.module.css";
import Image from "next/image";
import Link from "next/link";
const navLinks = [
  { url: "#Apie", linkText: "Visi albumai", linkTitle: "Visi albumai" },
  { url: "#Mokymai", linkText: "Pridėti albumą", linkTitle: "Pridėti albumą" },
  {
    url: "#Galerija",
    linkText: "Redaguoti albumą",
    linkTitle: "Redaguoti albumą",
  },
  {
    url: "#Kontaktai",
    linkText: "Ištrinti nuotrauką/albumą",
    linkTitle: "Ištrinti nuotrauką/albumą",
  },
];
const Header = () => {
  const [isMobileMenuOpen, setMobileMenuStatus] = useState(false);
  return (
    <>
      <header className={style.header}>
        <Image
          className={style.logo}
          alt="Povandeninio nardymo klubas"
          src="/images/akvanautas_logo.png"
          width={95}
          height={95}
        />
        <nav>
          <ul>
            <li>
              <a href="">Visi albumai</a>
            </li>
            <li>
              <a href="">Pridėti albumą</a>
            </li>
            <li>
              <a href="">Redaguoti albumą</a>
            </li>
            <li>
              <a href="">Ištrinti nuotrauką/albumą</a>
            </li>
          </ul>
          <Image
            onClick={() => setMobileMenuStatus(!isMobileMenuOpen)}
            className={style.menuMobile}
            src="/images/menu-ico.svg"
            alt="Mobile Menu"
            width={40}
            height={40}
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
    </>
  );
};

export default Header;
