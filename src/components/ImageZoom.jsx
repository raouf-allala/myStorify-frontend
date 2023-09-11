import React, { useRef, useEffect } from 'react';

const ImageZoom = ({ imageUrl }) => {
  const imageRef = useRef(null);
  useEffect(() => {
    const imageElement = imageRef.current;

    const handleMouseMove = (event) => {
      const { left, top, width, height } =
        imageElement.getBoundingClientRect();
      const { clientX, clientY } = event;

      const x = (clientX - left) / width;
      const y = (clientY - top) / height;

      imageElement.style.transformOrigin = `${x * 100}% ${y * 100}%`;
    };

    imageElement.addEventListener('mousemove', handleMouseMove);

    return () => {
      imageElement.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  return (
    <div className="image-zoom">
      <img ref={imageRef} src={imageUrl} alt="Zoomable Image" />
    </div>
  );
};

export default ImageZoom;
