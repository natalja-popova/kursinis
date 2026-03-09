import style from "./index.module.css";
import Header from "@/components/Header/Header";
import Foooter from "@/components/Footer/Foooter";
import Hero from "@/components/Hero/Hero";
import Image from "next/image";
import About from "@/components/About/About";

const HomePage = () => {
  const navLinks = [
    { url: "/", linkText: "APIE MUS", linkTitle: "Apie mus" },
    { url: "/", linkText: "MOKYMAI", linkTitle: "Mokymai" },
    { url: "/", linkText: "GALERIJA", linkTitle: "Galerija" },
    { url: "/", linkText: "KONTAKTAI", linkTitle: "Kontaktai" },
  ];

  return (
    <>
      <Header navLinks={navLinks} />
      <main className={style.main}>
        <Hero />
        <About />
        <section>
          <h2>Mokymai</h2>
        </section>
      </main>

      <Foooter navLinks={navLinks} />
    </>
  );
};

export default HomePage;
