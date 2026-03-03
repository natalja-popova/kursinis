import axios from "axios";
import { useState } from "react";
const UploadImages = () => {
  const [images, setImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const Upload = async () => {
    if (images.length === 0) {
      alert("Pasirinkit bent vieną nuotrauką");
      return;
    }
    const imgData = new FormData();
    images.forEach((img) => {
      imgData.append("images", img);
    });
    console.log("imgData", imgData);
    const response = await axios.post(
      "http://localhost:3002/uploads",
      imgData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    console.log(response.data);
  };

  const handleImages = (e) => {
    setImages(Array.from(e.target.files));
  };
  return (
    <div>
      <h3>Add photos</h3>
      <input type="file" multiple onChange={handleImages} />
      <button onClick={Upload}>Ikelti</button>
    </div>
  );
};

export default UploadImages;
