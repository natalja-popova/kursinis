import style from "./pageTemplate.module.css";
import Header from "../Header/Header";
type PageTemplateProps = {
  children: React.ReactNode;
};
const PageTemplate = ({ children }: PageTemplateProps) => {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
};

export default PageTemplate;
