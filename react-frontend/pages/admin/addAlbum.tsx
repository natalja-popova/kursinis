import PageTemplate from "../../components/Admin/PageTemplate/PageTemplate";
import AddImages from "../../components/Admin/AddImages/AddImages";
import style from "./styles.module.css";

const UploadImages = () => {
  return (
    <PageTemplate>
      <section className={style.smallSection}>
        <h3>Pridėti nuotraukų albumą</h3>

        <AddImages aName="" aDescription="" clearInputs={true} />
      </section>
    </PageTemplate>
  );
};

export default UploadImages;
