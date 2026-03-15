import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import style from "./styles.module.css";
import AddImages from "@/components/Admin/AddImages/AddImages";
import { handleAxiosError } from "@/utils/handleAxiosErrors";
import PageTemplate from "@/components/Admin/PageTemplate/PageTemplate";
import { API_BASE_URL } from "@/config";

type Album = {
  id: string;
  albumName: string;
  description?: string;
  images: string[];
};

const AllAlbums = () => {
  const router = useRouter();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedImages, setSelectedImages] = useState<
    { album: string; image: string }[]
  >([]);
  const [openAlbums, setOpenAlbums] = useState<Record<string, boolean>>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMsg, setErrMsg] = useState("");

  const fetchAlbums = async () => {
    const res = await axios.get(`${API_BASE_URL}/getAllAlbums`);

    setAlbums(res.data);
  };

  const handleSelect = (image: string, album: string) => {
    setSelectedImages((selected) => {
      const exists = selected.some(
        (item) => item.image === image && item.album === album,
      );

      return exists
        ? selected.filter(
            (item) => !(item.image === image && item.album === album),
          )
        : [...selected, { album, image }];
    });
  };
  const toggleAddImages = (id: string) => {
    setOpenAlbums((prev) => ({
      ...prev,
      [id]: !prev[id], // ← toggle
    }));
  };
  const closeAddImages = (id: string) => {
    setOpenAlbums((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const removePhotos = async () => {
    if (selectedImages.length === 0) {
      alert("Išrinkite bent vieną nuotrauką");
      return;
    }
    const uniqueAlbums = [...new Set(selectedImages.map((item) => item.album))];

    const ok = confirm(
      `Ar tikrai norite ištrinti pasirenktas nuotraukas iš ${uniqueAlbums} albumo/ų? `,
    );
    if (!ok) {
      return;
    }
    try {
      await axios.delete(`${API_BASE_URL}/deleteImages`, {
        data: { images: selectedImages },
      });

      await fetchAlbums();
      setSelectedImages([]);
    } catch (error) {
      setErrMsg(handleAxiosError(error));
    }
  };

  const removeAlbum = async (name: string) => {
    const ok = confirm(`Ar tikrai norite ištrinti albumą ${name}`);
    if (!ok) {
      return;
    }
    try {
      await axios.delete(`${API_BASE_URL}/deleteAlbum/${name}`);
      await fetchAlbums();
    } catch (error) {
      setErrMsg(handleAxiosError(error));
    }
  };
  return (
    <PageTemplate>
      <section>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        {albums.length > 0 ? (
          albums.map((album) => (
            <div key={album.id} className={style.albumWarpper}>
              <div className={style.ctaHeaderWarpper}>
                <h3>{album.albumName}</h3>
                <div className={style.ctaWarpper}>
                  <button className="btnDanger" onClick={removePhotos}>
                    Ištrinti nuotraukas
                  </button>
                  <button
                    className="btnDanger"
                    onClick={() => removeAlbum(album.albumName)}
                  >
                    Ištrinti albumą
                  </button>
                  <button
                    className="btn"
                    onClick={() => toggleAddImages(album.id)}
                  >
                    Pridėti nuotraukas
                  </button>
                </div>
              </div>
              <div>
                {successMessage && (
                  <div className={style.successMessage}>{successMessage}</div>
                )}
              </div>
              <div
                className={
                  openAlbums[album.id]
                    ? style.addImageVisible
                    : style.addImageHidden
                }
              >
                <AddImages
                  aName={album.albumName}
                  aDescription={album.description}
                  clearInputs={false}
                  onSuccess={(msg) => {
                    setSuccessMessage(msg);
                    closeAddImages(album.id);
                    fetchAlbums();

                    setTimeout(() => setSuccessMessage(""), 3000);
                  }}
                />
              </div>
              <div className={style.imagesWrapper}>
                {album.images.map((image) => {
                  const imagePath = `${API_BASE_URL}${image}`;
                  return (
                    <div key={image}>
                      <label
                        className={
                          selectedImages.some(
                            (item) =>
                              item.image === image &&
                              item.album === album.albumName,
                          )
                            ? `${style.checkboxLabel} ${style.selected}`
                            : style.checkboxLabel
                        }
                      >
                        <img
                          className={style.imgSize}
                          src={imagePath}
                          alt={album.description}
                        />
                        <input
                          type="checkbox"
                          checked={selectedImages.some(
                            (item) =>
                              item.image === image &&
                              item.album === album.albumName,
                          )}
                          onChange={() => handleSelect(image, album.albumName)}
                        />
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div>
            Nepridėta jokių albumų. <br />
            <br />
            <button
              className="btn"
              onClick={() => {
                router.push("/admin/addAlbum");
              }}
            >
              Sukurti albumą
            </button>
          </div>
        )}
      </section>
    </PageTemplate>
  );
};

export default AllAlbums;
