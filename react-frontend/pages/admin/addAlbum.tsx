import PageTemplate from "@/components/Admin/PageTemplate/PageTemplate";
import AddImages from "@/components/Admin/AddImages/AddImages";

const UploadImages = () => {
  return (
    <PageTemplate>
      <h3>Pridėti nuotraukų albumą</h3>

      <AddImages aName="" aDescription="" clearInputs={true} />
    </PageTemplate>
  );
};

export default UploadImages;
