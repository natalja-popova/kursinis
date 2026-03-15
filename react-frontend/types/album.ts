export type Album = {
  id: string;
  albumName: string;
  description?: string;
  images: string[];
};

export type GalleryItem = {
  original: string;
  thumbnail: string;
  thumbnailClass: string;
  thumbnailHeight: string;
};
