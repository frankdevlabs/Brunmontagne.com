import SimpleReactLightbox from "simple-react-lightbox";
import App from "./src/app";

export const wrapRootElement = ({ element }) => {
  return (
    <App>
      <SimpleReactLightbox>{element}</SimpleReactLightbox>
    </App>
  );
};
