import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { Stage, Layer, Image, Group, Rect } from "react-konva";
import useImage from "use-image";

import "./style.css";
import imageMask from "./mask-circle.png";
import userImage from "./UI-Lovecraft.jpg";

const USER_IMAGE_LAYER = {
  width: 624,
  height: 591
};

const MASK_LAYER = {
  width: 624,
  height: 591
};
const scaleBy = 1.02;

const App = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [stage, setStage] = useState({
    scale: 1,
    x: 0,
    y: 0
  });
  const [isDragging, setIsDragging] = useState(false);
  const [image] = useImage(userImage);
  const [mask] = useImage(imageMask);

  useEffect(() => {
    if (!image) return;
    let defaultZoom;

    if (image.naturalHeight >= image.naturalWidth) {
      defaultZoom = USER_IMAGE_LAYER.width / image.naturalWidth;
    } else {
      defaultZoom = USER_IMAGE_LAYER.height / image.naturalHeight;
    }
    setStage((prev) => ({ ...prev, scale: defaultZoom }));
  }, [image]);

  const onDragStart = () => setIsDragging(true);
  const onDragEnd = (e) => {
    setIsDragging(true);
    setX(e.target.x());
    setY(e.target.y());
    console.log({ x: e.target.x(), y: e.target.y() });
  };

  const handleWheel = (e) => {
    e.evt.preventDefault();

    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setStage({
      scale: newScale,
      x: (stage.getPointerPosition().x / newScale - mousePointTo.x) * newScale,
      y: (stage.getPointerPosition().y / newScale - mousePointTo.y) * newScale
    });
  };

  const SimulateMouseWheel = (e, BtnType, mScale = scaleBy) => {
    const newScale = BtnType > 0 ? stage.scale * mScale : stage.scale / mScale;
    setStage((prev) => ({ ...prev, scale: newScale }));
  };

  const onClickPlus = (e) => {
    SimulateMouseWheel(e, +1);
  };

  const onClickMinus = (e) => {
    SimulateMouseWheel(e, -1);
  };

  return (
    <div className="container">
      <Stage
        width={USER_IMAGE_LAYER.width}
        height={USER_IMAGE_LAYER.height}
        // onWheel={handleWheel}
        // scaleX={stage.scale}
        // scaleY={stage.scale}
        x={stage.x}
        y={stage.y}
      >
        <Layer>
          {/* --------- user image ---------  */}
          <Image
            image={image}
            x={x}
            y={y}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            scaleX={stage.scale}
            scaleY={stage.scale}
            // opacity={0.1}
          />
          {/* --------- mask ---------  */}
          <Image
            image={mask}
            x={0}
            y={0}
            width={MASK_LAYER.width}
            height={MASK_LAYER.height}
            globalCompositeOperation="multiply"
            opacity={0.1}
            listening={false} // equivalent to pointer events: none
          />
          {/* <Rect
              x={0}
              y={0}
              // draggable
              fill='#fff'
              opacity={1}
              width={USER_IMAGE_LAYER.width}
              height={USER_IMAGE_LAYER.height}
              listening={false}
              globalCompositeOperation="luminosity"
              // shadowBlur={5}
            /> */}
        </Layer>
      </Stage>
      <div className="zoomButtonContainer">
        <button className="zoomButton" onClick={onClickMinus}>
          -
        </button>
        <button className="zoomButton" onClick={onClickPlus}>
          +
        </button>
      </div>
    </div>
  );
};

render(<App />, document.getElementById("root"));
