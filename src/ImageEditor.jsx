import React, { useEffect, useMemo, useState, useRef } from "react";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";

import "./style.css";
import imageMask from "./mask-circle.png";
import userImage from "./UI-Lovecraft.jpg";
import Slider from "./Slider";

const USER_IMAGE_LAYER = {
  width: 624,
  height: 591
};

const MASK_LAYER = {
  width: 624,
  height: 591
};
const step = 0.1;
const getCroppedValues = ({ image, zoom, x, y }) => {
  const zoomedImageWidth = image.width * zoom;
  const zoomedImageHeight = image.height * zoom;

  const imageBounds = {
    imageLeft: x * zoom,
    imageTop: y * zoom,
    imageWidth: zoomedImageWidth,
    imageHeight: zoomedImageHeight
  };

  return imageBounds;
};
/**
 * create another canvas to invert the mask color
 * @param {*} image
 */
const invertMask = (image) => {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, image.width, image.height);

  const imageData = ctx.getImageData(0, 0, image.width, image.height);
  const data = imageData.data;

  for (let i = 0, n = data.length; i < n; i += 4) {
    data[i] = 0; // red
    data[i + 1] = 0; // green
    data[i + 2] = 0; // blue
    data[i + 3] = 255 - data[i + 3]; // alpha
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
};

const ImageEditor = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [zoom, setZoom] = useState(1);
  const [minZoom, setMinZoom] = useState(1);
  // Anonymous as crossOrigin to be able to do getImageData on it
  const [image] = useImage(userImage, "Anonymous");
  const [mask] = useImage(imageMask, "Anonymous");
  const invertedMask = useRef();
  const imageRef = useRef();

  const complete = !!mask?.complete;
  useMemo(() => {
    // console.log("complete", complete);
    if (complete) {
      invertedMask.current = invertMask(mask);
    }
  }, [complete, mask]);

  useEffect(() => {
    if (!image) return;
    let defaultZoom;

    if (image.naturalHeight >= image.naturalWidth) {
      defaultZoom = USER_IMAGE_LAYER.width / image.naturalWidth;
    } else {
      defaultZoom = USER_IMAGE_LAYER.height / image.naturalHeight;
    }
    setMinZoom(defaultZoom);
    setZoom(defaultZoom);
  }, [image]);

  // get the last updated cropped image value
  const croppedValue = useMemo(() => {
    if (!image) return;

    const imageBounds = {
      imageLeft: x * zoom,
      imageTop: y * zoom,
      imageWidth: image.naturalWidth * zoom,
      imageHeight: image.naturalHeight * zoom
    };

    return imageBounds;
  }, [image, zoom, x, y]);

  const onDragEnd = (e) => {
    setX(e.target.x());
    setY(e.target.y());
    // console.log({ x: e.target.x(), y: e.target.y() });
  };
  console.log("croppedValue", croppedValue);

  const handleWheel = (e) => {
    e.evt.preventDefault();
    const stage = e.target.getStage();

    const imageNode = imageRef.current;
    const imageZoom = imageNode.scaleX();

    // wheel down = zoom+, wheel up = zoom-
    const newZoom = e.evt.deltaY > 0 ? imageZoom + step : imageZoom - step;

    if (newZoom < minZoom) return;
    setZoom(newZoom);

    // always center the image when zooming
    const mousePointTo = {
      x: stage.getPointerPosition().x / imageZoom - imageNode.x() / imageZoom,
      y: stage.getPointerPosition().y / imageZoom - imageNode.y() / imageZoom
    };

    const newX =
      (stage.getPointerPosition().x / newZoom - mousePointTo.x) * newZoom;
    const newY =
      (stage.getPointerPosition().y / newZoom - mousePointTo.y) * newZoom;
    setX(newX);
    setY(newY);
  };

  const onZoomChange = (value) => {
    setZoom(value);
  };

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
            image={invertedMask.current}
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
          step={step}
          onChange={onZoomChange}
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
