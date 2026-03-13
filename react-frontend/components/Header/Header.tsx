import Link from "next/link";
import Image from "next/image";
import style from "./header.module.css";
import { useState } from "react";
type NavLink = {
  url: string;
  linkText: string;
  linkTitle: string;
};
type HeaderLinksProps = {
  navLinks: NavLink[];
};

const Header = ({ navLinks }: HeaderLinksProps) => {
  const [isMobileMenuOpen, setMobileMenuStatus] = useState(false);
  return (
    <>
      <header className={style.header}>
        <Link className={style.brandWrapper} href="/">
          <Image
            className={style.logo}
            alt="Povandeninio nardymo klubas"
            src="/images/akvanautas_logo.png"
            width={95}
            height={95}
          />
          <h1>POVANDENINIO NARDYMO KLUBAS</h1>
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
