import React from "react";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";

import "./style.css";
import imageMask from "./mask-circle.png";
import userImage from "./UI-Lovecraft.jpg";
import Slider from "./Slider";
import { useCropper, ZOOM_STEP } from "./hooks/useCropper";

const USER_IMAGE_LAYER = {
  width: 624,
  height: 591
};

const MASK_LAYER = {
  width: 624,
  height: 591
};

const ImageEditor = () => {
  // Anonymous as crossOrigin to be able to do getImageData on it
  const [image] = useImage(userImage, "Anonymous");
  const [mask] = useImage(imageMask, "Anonymous");

  const {
    setZoom,
    zoom,
    minZoom,
    handleWheel,
    onDragEnd,
    croppedValue,
    x,
    y,
    imageRef,
    invertedMaskRef
  } = useCropper({ image, mask, layer: USER_IMAGE_LAYER });

  console.log(croppedValue);
  const onMouseEnter = (event) => {
    event.target.getStage().container().style.cursor = "move";
  };
  const onMouseLeave = (event) => {
    event.target.getStage().container().style.cursor = "default";
  };

  return (
    <div className="container flexCenter">
      <Stage
        width={USER_IMAGE_LAYER.width}
        height={USER_IMAGE_LAYER.height}
        onWheel={handleWheel}
        x={0}
        y={0}
        // style={{ backgroundColor: 'rgba(0, 0, 0, 0.8'}}
      >
        <Layer>
          {/* --------- user image ---------  */}
          <Image
            ref={imageRef}
            image={image}
            x={x}
            y={y}
            draggable
            onDragEnd={onDragEnd}
            scaleX={zoom}
            scaleY={zoom}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
          {/* --------- mask ---------  */}
          <Image
            image={invertedMaskRef.current}
            x={0}
            y={0}
            width={MASK_LAYER.width}
            height={MASK_LAYER.height}
            globalCompositeOperation="normal"
            opacity={0.7}
            listening={false} // equivalent to pointer events: none
          />
        </Layer>
      </Stage>
      <div className="flexCenter m-t-20 m-b-10">
        <Slider
          step={ZOOM_STEP}
          onChange={setZoom}
          defaultValue={minZoom}
          value={zoom}
          min={minZoom}
          max={3}
        />
      </div>
    </div>
  );
};

export default ImageEditor;
