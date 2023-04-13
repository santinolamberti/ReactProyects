//@ts-nocheck
import React, { useState } from 'react';
import FsLightbox from 'fslightbox-react';
//Estilos
import "../styles/Gallery.css";


export default function Gallery(props) {
  const [toggler, setToggler] = useState(false);
  let images = props.imagenes

  return (
    <>
      <div className="gallery-container">
      {images.map( (photo, index ) => {
          if (index < 5) {
            return (
              <div key={`photo-${index}`}>
                <img src={photo.url} alt={photo.titulo} />
              </div>
            );
          } else {
            return null;
          }
        })}
        <div className="ver-mas btn-1" onClick={() => setToggler(!toggler)}>
          Ver más
        </div>
        <FsLightbox
          toggler={toggler}
          sources={images.map( photo => photo.url)}
          type="image"
          customAttributes={images.map( photo => {
            return { alt: photo.titulo, };
          })}
        />
      </div>
    </>
  );
}
