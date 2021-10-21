import { useEffect, useMemo, useState, useRef } from "react";

export const ZOOM_STEP = 0.1;
export const ZOOM_MAX = 3;

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

const centerZoom = ({ maskLayer, stage, oldZoom, newZoom, imageNode }) => {
  const containerWidth = maskLayer ? maskLayer.width : stage.width();
  const containerHeight = maskLayer ? maskLayer.height : stage.width();

  const mousePointTo = {
    x: containerWidth / 2 / oldZoom - imageNode.x() / oldZoom,
    y: containerHeight / 2 / oldZoom - imageNode.y() / oldZoom
  };

  const newX = (containerWidth / 2 / newZoom - mousePointTo.x) * newZoom;
  const newY = (containerHeight / 2 / newZoom - mousePointTo.y) * newZoom;
  return {
    newX,
    newY
  };
};

export const useCropper = ({ image, imageMask, layer, maskLayer }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [zoom, setZoom] = useState(1);
  const [minZoom, setMinZoom] = useState(1);
  const invertedMaskRef = useRef();
  const imageRef = useRef();
  const stageRef = useRef();

  const complete = !!imageMask?.complete;
  useMemo(() => {
    if (!imageMask) return;
    if (complete) {
      invertedMaskRef.current = invertMask(imageMask);
    }
  }, [complete, imageMask]);

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

    const containerWidth = maskLayer ? maskLayer.width : layer.width();
    const containerHeight = maskLayer ? maskLayer.height : layer.width();

    const mousePointTo = {
      x: containerWidth / 2 - image.x,
      y: containerHeight / 2 - image.y
    };

    // center horizontaly
    if (image.naturalHeight <= image.naturalWidth) {
      const newX =
        (containerWidth / 2 / defaultZoom - mousePointTo.x) * defaultZoom;
      newX > 0 ? setX(-newX) : setX(newX);
      // center varticaly
    } else {
      const newY =
        (containerHeight / 2 / defaultZoom - mousePointTo.y) * defaultZoom;
      newY > 0 ? setY(-newY) : setY(newY);
    }
  }, [image, layer, maskLayer]);

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
  };
  // console.log("croppedValue", croppedValue);

  const handleWheelRelativeToPointer = (e) => {
    e.evt.preventDefault();
    const stage = e.target.getStage();

    const imageNode = imageRef.current;
    const oldZoom = imageNode.scaleX();

    // wheel down = zoom+, wheel up = zoom-
    const newZoom =
      e.evt.deltaY > 0 ? oldZoom + ZOOM_STEP : oldZoom - ZOOM_STEP;

    if (newZoom < minZoom) return;
    setZoom(newZoom);

    // always center the image when zooming
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldZoom - imageNode.x() / oldZoom,
      y: stage.getPointerPosition().y / oldZoom - imageNode.y() / oldZoom
    };

    const newX =
      (stage.getPointerPosition().x / newZoom - mousePointTo.x) * newZoom;
    const newY =
      (stage.getPointerPosition().y / newZoom - mousePointTo.y) * newZoom;
    setX(newX);
    setY(newY);
  };

  const handleWheel = (e) => {
    e.evt.preventDefault();
    const stage = e.target.getStage();

    const imageNode = imageRef.current;
    const oldZoom = imageNode.scaleX();

    // wheel down = zoom+, wheel up = zoom-
    const newZoom =
      e.evt.deltaY < 0 ? oldZoom + ZOOM_STEP : oldZoom - ZOOM_STEP;

    if (newZoom < minZoom || newZoom > ZOOM_MAX) return;
    setZoom(newZoom);

    const { newX, newY } = centerZoom({
      maskLayer,
      stage,
      oldZoom,
      newZoom,
      imageNode
    });

    setX(newX);
    setY(newY);
  };

  const onZoom = (value) => {
    const stage = stageRef.current;

    const imageNode = imageRef.current;
    const oldZoom = imageNode.scaleX();

    const { newX, newY } = centerZoom({
      maskLayer,
      stage,
      oldZoom,
      newZoom: value,
      imageNode
    });
    setX(newX);
    setY(newY);
    setZoom(value);
  };

  return {
    onZoom,
    zoom,
    minZoom,
    handleWheel,
    onDragEnd,
    croppedValue,
    x,
    y,
    imageRef,
    invertedMaskRef,
    stageRef,
    // if needed
    handleWheelRelativeToPointer
  };
};
