import ReactModal from "react-modal";
import { useState } from "react";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import style from "./courses.module.css";
import CourseCard from "./CoursesCard";
import { useInViewAnimation } from "../../hooks/useInViewAnimation";

const Courses = () => {
  const [selectedLevel, setSelectedLevel] = useState<
    "CMAS1" | "CMAS2" | "CMAS3"
  >("CMAS1");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref, inView } = useInViewAnimation<HTMLElement>();
  const openForm = (level: "CMAS1" | "CMAS2" | "CMAS3") => {
    setSelectedLevel(level);
    setIsModalOpen(true);
  };
  return (
    <section
      ref={ref}
      id="Mokymai"
      className={`${style.sectionWrapper} reveal ${inView ? "revealIn" : ""}`}
    >
      <h2> Nardymo kursai</h2>
      <div className={style.contentWrapper}>
        <div className={style.coursesWrapper}>
          <CourseCard
            h3="CMAS 1* nardymo kursai"
            imgSrc="/images/courses/cmas-1-kursai.png"
            text1="350€ + 50€ nardymo sertifikatas ir nardymo knygelė"
            text2="Nuo 14 metų"
            onRegisterClick={() => openForm("CMAS1")}
          />
          <CourseCard
            h3="CMAS 2* nardymo kursai"
            imgSrc="/images/courses/cmas-2-kursai.png"
            text1="350€ + 50€ nardymo sertifikatas"
            text2=""
            onRegisterClick={() => openForm("CMAS2")}
          />
          <CourseCard
            h3="CMAS vaikų kursai"
            imgSrc="/images/courses/cmas-vaiku-kursai.jpg"
            text1="350€ + 50€ nardymo sertifikatas ir nardymo knygelė"
            text2="nuo 8 iki 14 metų"
            onRegisterClick={() => openForm("CMAS3")}
          />
        </div>
      </div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        overlayClassName="modalOverlay"
        className="modalContent"
        ariaHideApp={false}
      >
        <RegistrationForm
          selectedLevel={selectedLevel}
          onChangeLevel={setSelectedLevel}
          onClose={() => setIsModalOpen(false)}
        />
      </ReactModal>
    </section>
  );
};

export default Courses;
