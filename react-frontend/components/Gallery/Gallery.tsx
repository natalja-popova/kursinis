import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import style from "./gallery.module.css";
import { handleAxiosError } from "../../utils/handleAxiosErrors";
import { Album, GalleryItem } from "../../types/album";
import { useInViewAnimation } from "../../hooks/useInViewAnimation";

const toGalleryItems = (images: string[]): GalleryItem[] =>
  images.map((img) => ({
    // if backend returns "/gallery/..." use this:
    original: `${API_BASE_URL}${img}`,
    thumbnail: `${API_BASE_URL}${img}`,
    thumbnailClass: style.thumbnailImg,
    thumbnailHeight: "70px",
  }));

const Gallery = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [errorMsg, setErrMsg] = useState("");
  const { ref, inView } = useInViewAnimation<HTMLElement>();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await axios.get<Album[]>(`${API_BASE_URL}/getAllAlbums`);
        setAlbums(res.data);
        if (res.data.length > 0) {
          setSelectedAlbumId(res.data[0].id);
        }
      } catch (error) {
        setErrMsg(handleAxiosError(error));
      }
    };

    fetchAlbums();
  }, []);

  const selectedAlbum = albums.find((a) => a.id === selectedAlbumId);

  const items = selectedAlbum ? toGalleryItems(selectedAlbum.images) : [];

  return (
    <section
      ref={ref}
      id="Galerija"
      className={`${style.galleryWrapper} reveal ${inView ? "revealIn" : ""}`}
    >
      <h2>Galerija</h2>
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      {/* Album list as links/buttons */}
      <div className={style.albumList}>
        {albums.map((album) => (
          <button
            key={album.id}
            type="button"
            className={
              album.id === selectedAlbumId
                ? style.albumLinkActive
                : style.albumLink
            }
            onClick={() => setSelectedAlbumId(album.id)}
          >
            {album.albumName}
          </button>
        ))}
      </div>

      {selectedAlbum && (
        <div className={style.gallery}>
          <h3>{selectedAlbum.albumName}</h3>
          {selectedAlbum.description && <p>{selectedAlbum.description}</p>}

          <ImageGallery items={items} />
        </div>
      )}
    </section>
  );
};

export default Gallery;
