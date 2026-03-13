import Image from "next/image";
import style from "./courses.module.css";
import CourseCard from "./CoursesCard";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import { useState } from "react";

const Courses = () => {
  const [selectedLevel, setSelectedLevel] = useState<
    "CMAS1" | "CMAS2" | "CMAS3"
  >("CMAS1");
  return (
    <section id="Mokymai" className={style.sectionWrapper}>
      <h2> Nardymo kursai</h2>
      <div className={style.contentWrapper}>
        <div className={style.coursesWrapper}>
          <CourseCard
            h3="CMAS 1* nardymo kursai"
            imgSrc="/images/courses/cmas-1-kursai.png"
            text1="350€ + 50€ nardymo sertifikatas ir nardymo knygelė"
            text2="Nuo 14 metų"
            onRegisterClick={() => setSelectedLevel("CMAS1")}
          />
          <CourseCard
            h3="CMAS 2* nardymo kursai"
            imgSrc="/images/courses/cmas-2-kursai.png"
            text1="350€ + 50€ nardymo sertifikatas"
            text2=""
            onRegisterClick={() => setSelectedLevel("CMAS2")}
          />
          <CourseCard
            h3="CMAS vaikų kursai"
            imgSrc="/images/courses/cmas-vaiku-kursai.jpg"
            text1="350€ + 50€ nardymo sertifikatas ir nardymo knygelė"
            text2="nuo 8 iki 14 metų"
            onRegisterClick={() => setSelectedLevel("CMAS3")}
          />
        </div>
      </div>
      <RegistrationForm
        selectedLevel={selectedLevel}
        onChangeLevel={setSelectedLevel}
      />
    </section>
  );
};

export default Courses;
