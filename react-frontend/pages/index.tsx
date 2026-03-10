import style from "./index.module.css";
import Header from "@/components/Header/Header";
import Foooter from "@/components/Footer/Foooter";
import Hero from "@/components/Hero/Hero";
import Image from "next/image";
import About from "@/components/About/About";
import { useState } from "react";
import Courses from "@/components/Courses/Courses";
import Medicine from "../components/About/Мedicine";
import Gallery from "@/components/Gallery/Gallery";

const HomePage = () => {
  const navLinks = [
    { url: "#Apie", linkText: "APIE MUS", linkTitle: "Apie mus" },
    { url: "#Mokymai", linkText: "MOKYMAI", linkTitle: "Mokymai" },
    { url: "#Galerija", linkText: "GALERIJA", linkTitle: "Galerija" },
    { url: "#Kontaktai", linkText: "KONTAKTAI", linkTitle: "Kontaktai" },
  ];
  const images = [
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
    <>
      <Header navLinks={navLinks} />
      <main className={style.main}>
        <Hero bgImage={bg.url} />
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
