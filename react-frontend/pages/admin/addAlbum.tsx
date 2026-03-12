import { validateJwt } from "@/services/authService";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import style from "./styles.module.css";
import PageTemplate from "@/components/Admin/PageTemplate/PageTemplate";

const UploadImages = () => {
  const [images, setImages] = useState([]);
  const [albumName, setAlbumName] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const Upload = async () => {
    if (images.length === 0) {
      alert("Pasirinkit bent vieną nuotrauką");
      return;
    }

    const imgData = new FormData();
    imgData.append("albumName", albumName);
    imgData.append("albumDescription", albumDescription);
    images.forEach((img) => {
      imgData.append("images", img);
    });

    try {
      const response = await axios.post(
        "http://localhost:3002/uploads",
        imgData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      setUploadMessage("Albumas sekmingai pridėtas");
      setAlbumName("");
      setAlbumDescription("");
      setImages([]);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err: any) {
      console.error("Klaida trinant nuotraukas:", err);
      setUploadMessage("Klaida pridedant nuotraukas:", err);
      if (err.response) {
        setUploadMessage("Serverio klaida: " + err.response.data.message);
      } else if (err.request) {
        setUploadMessage("Serveris neatsako");
      } else {
        setUploadMessage("Nežinoma klaida");
      }
    }
  };

  const handleImages = (e) => {
    setImages(Array.from(e.target.files));
  };
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
    <PageTemplate>
      <div className={style.flexColumn}>
        <h3>Pridėti nuotraukų albumą</h3>
        <input
          type="file"
          multiple
          onChange={handleImages}
          ref={fileInputRef}
        />
        <input
          type="text"
          placeholder="Albumo pavadinimas"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
        />

        <textarea
          placeholder="Albumo aprašymas"
          value={albumDescription}
          onChange={(e) => setAlbumDescription(e.target.value)}
        />
        <button onClick={Upload}>Įkelti</button>
      </div>
      {uploadMessage && <div>{uploadMessage}</div>}
    </PageTemplate>
  );
};

export default UploadImages;
