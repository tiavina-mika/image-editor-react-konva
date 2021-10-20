import { useEffect, useMemo, useState, useRef } from "react";

export const ZOOM_STEP = 0.1;

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

export const useCropper = ({ image, mask, layer }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [zoom, setZoom] = useState(1);
  const [minZoom, setMinZoom] = useState(1);
  // Anonymous as crossOrigin to be able to do getImageData on it
  // const [image] = useImage(userImage, "Anonymous");
  // const [mask] = useImage(imageMask, "Anonymous");
  const invertedMaskRef = useRef();
  const imageRef = useRef();

  const complete = !!mask?.complete;
  useMemo(() => {
    if (!mask) return;
    // console.log("complete", complete);
    if (complete) {
      invertedMaskRef.current = invertMask(mask);
    }
  }, [complete, mask]);

  useEffect(() => {
    if (!image) return;
    let defaultZoom;

    if (image.naturalHeight >= image.naturalWidth) {
      defaultZoom = layer.width / image.naturalWidth;
    } else {
      defaultZoom = layer.height / image.naturalHeight;
    }
    setMinZoom(defaultZoom);
    setZoom(defaultZoom);
  }, [image, layer]);

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
  // console.log("croppedValue", croppedValue);

  const handleWheel = (e) => {
    e.evt.preventDefault();
    const stage = e.target.getStage();

    const imageNode = imageRef.current;
    const imageZoom = imageNode.scaleX();

    // wheel down = zoom+, wheel up = zoom-
    const newZoom =
      e.evt.deltaY > 0 ? imageZoom + ZOOM_STEP : imageZoom - ZOOM_STEP;

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

  return {
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
  };
};
