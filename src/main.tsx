import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";
import { ImageViewerProvider } from "./context/ImageViewerContext.tsx";
import { AlertProvider } from "./context/AlertContext.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AlertProvider>
      <ImageViewerProvider>
        <App />
      </ImageViewerProvider>
    </AlertProvider>
  </Provider>
);
