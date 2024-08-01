import s from "./ImageCard.module.css";
const ImageCard = ({ onClick, image }) => {
  return (
    <div className={s.card}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        onClick={() => onClick(image)}
        className={s.image}
      />
    </div>
  );
};

export default ImageCard;
