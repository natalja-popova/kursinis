import Link from "next/link";
import style from "./footer.module.css";
type NavLink = {
  url: string;
  linkText: string;
  linkTitle: string;
};
type footerLinksProps = {
  navLinks: NavLink[];
};
const Foooter = ({ navLinks }: footerLinksProps) => {
  return (
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
  );
};

export default Foooter;
