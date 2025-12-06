import FullScreenImageViewer from "@/components/ui/FullScreenImageViewer";
import { createContext, useContext, useState } from "react";

interface ImageViewerContextType {
  openImage: (src: string) => void;
}

const ImageViewerContext = createContext<ImageViewerContextType>({
  openImage: () => {},
});

export const useImageViewer = () => useContext(ImageViewerContext);

export const ImageViewerProvider = ({ children }: { children: React.ReactNode }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const openImage = (src: string) => {
    setImageSrc(src);
  };

  const closeImage = () => {
    setImageSrc(null);
  };

  return (
    <ImageViewerContext.Provider value={{ openImage }}>
      {children}

      {/* Full screen viewer inserted once globally */}
      <FullScreenImageViewer src={imageSrc || ""} open={!!imageSrc} onClose={closeImage} />
    </ImageViewerContext.Provider>
  );
};
