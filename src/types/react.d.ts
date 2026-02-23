import React from "react";
import { ModelViewerAttributes } from "@google/model-viewer";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & ModelViewerAttributes,
        HTMLElement
      >;
    }
  }
}

declare global {
  interface HTMLModelViewerElement extends HTMLElement {
    src: string;
    alt: string;
    animationName: string;
    orbit: string;
    position: string;
    width: string;
    height: string;
    play: () => void;
  }
}
