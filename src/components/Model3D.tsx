import React, { useRef, useEffect } from "react";
import "@google/model-viewer";

interface ModelViewerProps {
  id?: string;
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  animationName?: string;
  orbit?: string;
  position?: string;
}

const Model3D: React.FC<ModelViewerProps> = ({
  id,
  src,
  alt = "3D Model",
  animationName = "Attack_1",
  orbit = "-90deg 90deg 4m",
}) => {
  const modelRef = useRef<HTMLModelViewerElement>(null);
  const isMobile = window.innerWidth <= 932;
  const isEnemy = id === "enemy";
  const mobileWidth = `${window.innerWidth * 0.4}px`;
  const mobileHeight = `${window.innerHeight * 0.5}px`;
  const baseWidth = isMobile ? mobileWidth : isEnemy ? "600px" : "300px";
  const baseHeight = isMobile ? mobileHeight : isEnemy ? "700px" : "350px";

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.addEventListener("load", () => {
        if (modelRef.current) {
          modelRef.current.play();
          if (animationName) {
            modelRef.current.animationName = animationName;
          }
        }
      });
    }
  }, [animationName]);

  return (
    <model-viewer
      id={id}
      ref={modelRef}
      src={src}
      alt={alt}
      background-color="transparent"
      animation-name={animationName}
      auto-play
      loop
      camera-position={orbit}
      camera-orbit={orbit}
      zoom="-5"
      position="0m 0m 0m"
      style={{ width: baseWidth, height: baseHeight }}
    ></model-viewer>
  );
};

export default Model3D;
