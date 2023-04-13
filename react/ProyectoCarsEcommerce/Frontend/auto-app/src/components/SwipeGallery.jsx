import ImageGallery from "react-image-gallery";
import '../styles/SwipeGallery.css';

//Es necesario tener un key llamado original que le sigue la dirección

export default function SwipeGallery(props) {
  
  let images = []
  props.imagenes.forEach((image) => {images.push({ original: image.url, })})
  
  return (
    <>
      <ImageGallery
        items={images}
        showNav={false}
        showThumbnails={false}
        showPlayButton={false}
        showIndex={true}
        autoPlay={true}
      />
    </>
  );
}
