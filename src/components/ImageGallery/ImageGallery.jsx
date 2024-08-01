import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";
const ImageGallery = ({ items, onImageClick }) => {
  return (
    <div>
      <ul className={s.list}>
        {items.map(image => (
          <li className={s.item} key={image.id}>
            <ImageCard onClick={onImageClick} image={image} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
