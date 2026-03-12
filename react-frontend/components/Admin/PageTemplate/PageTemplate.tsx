import style from "./pageTemplate.module.css";
import Header from "../Header/Header";
import { useEffect } from "react";
import { validateJwt } from "@/services/authService";
import { useRouter } from "next/router";
type PageTemplateProps = {
  children: React.ReactNode;
};
const PageTemplate = ({ children }: PageTemplateProps) => {
  const router = useRouter();
  useEffect(() => {
    const run = async () => {
      const isValid = await validateJwt();

      if (!isValid) {
        router.push("/admin/");
        return;
      }
    };
    run();
  }, []);
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
};

export default PageTemplate;
