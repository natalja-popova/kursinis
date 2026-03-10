import style from "./courses.module.css";

const Courses = () => {
  return (
    <section id="Mokymai" className={style.bgrImage}>
      <h2> Nardymo kursai</h2>
      <div className={style.contentWrapper}>
        <div className={style.coursesWrapper}>
          <div className={style.course}>
            <h3>CMAS 1* nardymo kursai:</h3>
            <p>350€ + 50€ nardymo sertifikatas ir nardymo knygelė</p>
            <p>Nuo 14 metų</p>

            <button>Registruotis</button>
          </div>
          <div className={style.course}>
            <h3>CMAS 2* nardymo kursai:</h3>
            <p>350€ + 50€ nardymo sertifikatas</p>

            <button>Registruotis</button>
          </div>
          <div className={style.course}>
            <h3>CMAS vaikų kursai:</h3>
            <p>350€ + 50€ nardymo sertifikatas ir nardymo knygelė</p>
            <p>nuo 8 iki 14 metų</p>

            <button>Registruotis</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
