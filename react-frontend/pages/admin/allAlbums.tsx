import PageTemplate from "@/components/Admin/PageTemplate/PageTemplate";
import { API_BASE_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";
import style from "./styles.module.css";
import { useRouter } from "next/router";

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

  useEffect(() => {
    fetchAlbums();
  }, []);

  const AddAlbum = (albumId: string) => {
    console.log("albumId", albumId);
  };
  const removePhotos = async () => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/deleteImages`, {
        data: { images: selectedImages },
      });

      await fetchAlbums();
      setSelectedImages([]);

      console.log("Ištrinta sėkmingai");
    } catch (err: any) {
      console.error("Klaida trinant nuotraukas:", err);
      if (err.response) {
        alert("Serverio klaida: " + err.response.data.message);
      } else if (err.request) {
        alert("Serveris neatsako");
      } else {
        alert("Nežinoma klaida");
      }
    }
  };

  const removeAlbum = async (id: string, name: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/deleteAlbum/${name}`);
      await fetchAlbums();
    } catch (err: any) {
      console.error("Klaida trinant albumą:", err);

      if (err.response) {
        alert("Serverio klaida: " + err.response.data.message);
      } else if (err.request) {
        alert("Serveris neatsako");
      } else {
        alert("Nežinoma klaida");
      }
    }
  };
  return (
    <PageTemplate>
      <section>
        {albums.length > 0 ? (
          albums.map((album) => (
            <div key={album.id} className={style.albumWarpper}>
              <div className={style.ctaWarpper}>
                <h3>{album.albumName}</h3>
                <div>
                  <button onClick={removePhotos}>Ištrinti nuotraukas</button>
                  <button
                    onClick={() => removeAlbum(album.id, album.albumName)}
                  >
                    Ištrinti albumą
                  </button>
                  <button onClick={() => AddAlbum(album.id)}>
                    Pridėti nuotraukas
                  </button>
                </div>
              </div>
              <div className={style.imagesWrapper}>
                {album.images.map((image) => {
                  const imagePath = `${API_BASE_URL}${image}`;
                  return (
                    <div key={image}>
                      <img
                        className={style.imgSize}
                        src={imagePath}
                        alt={album.description}
                      />
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginTop: "6px",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedImages.some(
                            (item) =>
                              item.image === image &&
                              item.album === album.albumName,
                          )}
                          onChange={() => handleSelect(image, album.albumName)}
                        />
                        pasirinkti
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
