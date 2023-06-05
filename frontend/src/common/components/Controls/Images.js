import React, { useEffect, useState } from "react";
import { Delete } from '@mui/icons-material';

const Images = ({removeImage, image}) => {
  const [imageData, setImageData] = useState(null);

  function resizeBase64Img(base64, width, height) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = base64;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL());
      };
      img.onerror = reject;
    });
  }

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imageData = await resizeBase64Img(image, 200, 200);
        setImageData(imageData);
      } catch (error) {
        console.log("error: ", error.message);
      }      
    }
    loadImages();
  }, [image]);

  return (<div>
          {removeImage && <Delete onClick={removeImage} />}
          <img src={imageData} alt="Avatar Preview" />
      </div>);
}

export default Images;
