import React from "react";
import "@google/model-viewer";

interface ModelViewerProps {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
}

const Model3D: React.FC<ModelViewerProps> = ({
  src,
  alt = "3D Model",
  width = "500px",
  height = "500px",
}) => {
  return (
    <model-viewer
      src={src}
      alt={alt}
      auto-rotate
      auto-play
      camera-controls
      animation-name="Dance_Loop"
      background-color="transparent"
      style={{ width, height }}
    ></model-viewer>
  );
};

export default Model3D;
