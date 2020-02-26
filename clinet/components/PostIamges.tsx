import { Icon } from "antd";
import { useCallback, useState } from "react";
import ImagesZoom from "./ImagesZoom";

const PostImages = ({ images }) => {
  const [showIamgesZoom, setShowImagesZoom] = useState(false);
  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);
  if (images.length === 1) {
    return (
      <>
        <img
          src={`http://localhost:8080/${images[0].src}`}
          alt=""
          onClick={onZoom}
        />
        {showIamgesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  } else if (images.length === 2) {
    return (
      <>
        <div>
          <img
            src={`http://localhost:8080/${images[0].src}`}
            alt=""
            width="50%"
          onClick={onZoom}

          />
          <img
            src={`http://localhost:8080/${images[1].src}`}
            alt=""
            width="50%"
          onClick={onZoom}

          />
        </div>
        {showIamgesZoom && <ImagesZoom images={images} onClose={onClose}/>}
      </>
    );
  } else {
    return (
      <>
        <div>
          <img
            src={`http://localhost:8080/${images[0].src}`}
            alt=""
            width="50%"
          onClick={onZoom}

          />
          <div
            style={{
              display: "inline-block",
              width: "50%",
              textAlign: "center",
              verticalAlign: "middle"
            }}
          onClick={onZoom}

          >
            <Icon type="plus" />
            <br />
            {images.length - 1}
            개의 사진 더보기
            
          </div>
        </div>
        {showIamgesZoom && <ImagesZoom images={images} onClose={onClose}/>}
      </>
    );
  }
};

export default PostImages;
