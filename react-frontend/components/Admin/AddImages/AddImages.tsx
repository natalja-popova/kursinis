import { ChangeEvent, useRef, useState } from "react";
import axios from "axios";
import style from "./addImages.module.css";
import { handleAxiosError } from "../../../utils/handleAxiosErrors";
import { API_BASE_URL } from "../../../config";

type AddImagesProps = {
  aName: string;
  aDescription?: string;
  onSuccess?: (msg: string) => void;
  clearInputs?: boolean;
};

const AddImages = ({
  aName,
  aDescription,
  onSuccess,
  clearInputs,
}: AddImagesProps) => {
  const [images, setImages] = useState<File[]>([]);
  const [albumName, setAlbumName] = useState(aName || "");
  const [albumDescription, setAlbumDescription] = useState(aDescription || "");

  const [uploadMessage, setUploadMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages(Array.from(e.target.files));
  };

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
      await axios.post(`${API_BASE_URL}/uploads`, imgData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadMessage("Albumas sekmingai pridėtas");
      if (clearInputs) {
        setAlbumName("");
        setAlbumDescription("");
        setImages([]);
      }
      if (onSuccess) {
        onSuccess("Nuotraukos sėkmingai pridėtos");
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setUploadMessage(handleAxiosError(error));
    }
  };
  return (
    <div className={style.flexColumn}>
      <input type="file" multiple onChange={handleImages} ref={fileInputRef} />
      <input
        type="text"
        placeholder="Albumo pavadinimas"
        value={albumName}
        onChange={(e) => setAlbumName(e.target.value)}
        readOnly={Boolean(aName)}
      />
      <textarea
        placeholder="Albumo aprašymas"
        value={albumDescription}
        onChange={(e) => setAlbumDescription(e.target.value)}
      />
      <button className="btnCTA" onClick={Upload}>
        Įkelti
      </button>
      {uploadMessage && <div>{uploadMessage}</div>}
    </div>
  );
};

export default AddImages;
