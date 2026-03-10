import style from "./footer.module.css";

const Foooter = () => {
  return (
    <footer id="Kontaktai" className={style.footer}>
      <div>
        <h4>Adresas</h4>
        <p>
          <a
            href="https://www.google.com/maps/place/Capital+Children+and+Youth+Center/@54.6993978,25.2649788,17z/data=!3m1!4b1!4m6!3m5!1s0x46dd93ff6a0cdbe1:0x321ab583aa5cd2c4!8m2!3d54.6993978!4d25.2675537!16s%2Fg%2F1q54v_tlc?entry=ttu&g_ep=EgoyMDI2MDMwNC4xIKXMDSoASAFQAw%3D%3D"
            target="_blank"
          >
            Hobiverse (Sostinės vaikų ir jaunimo centras)
            <br /> SVJC Konstitucijos pr. 25, Vilnius
          </a>
        </p>
      </div>
      <div>
        <h4>Kontaktai:</h4>
        <p>
          +370 698 11580 Tania<br></br>
          +370 600 40466 Nijolė
        </p>
        <p>
          <a href="mailto:taniadiver@yahoo.com">taniadiver@yahoo.com</a>
        </p>
      </div>
    </footer>
  );
};

export default Foooter;
