import style from "./index.module.css";
import Header from "@/components/Header/Header";
import Foooter from "@/components/Footer/Foooter";
import Hero from "@/components/Hero/Hero";
import ReactModal from "react-modal";
import Head from "next/head";

import About from "../components/About/About";

import Courses from "../components/Courses/Courses";
import Medicine from "../components/About/Мedicine";
import Gallery from "../components/Gallery/Gallery";

ReactModal.setAppElement("#__next"); // Next.js root

const HomePage = () => {
  const navLinks = [
    { url: "#Apie", linkText: "APIE MUS", linkTitle: "Apie mus" },
    { url: "#Mokymai", linkText: "MOKYMAI", linkTitle: "Mokymai" },
    { url: "#Galerija", linkText: "GALERIJA", linkTitle: "Galerija" },
    { url: "#Kontaktai", linkText: "KONTAKTAI", linkTitle: "Kontaktai" },
  ];

  return (
    <>
      <Header navLinks={navLinks} />
      <main className={style.main}>
        <Head>
          <link
            rel="preload"
            as="image"
            href="/imgSlider/Bacground-photo1.jpg"
          />
        </Head>
        <Hero />
        <About />
        <Medicine />
        <Courses />
        <Gallery />
      </main>

      <Foooter />
    </>
  );
};

export default HomePage;
