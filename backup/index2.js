import React, { useState } from "react";
import { render } from "react-dom";
import { Stage, Layer, Text, Image } from "react-konva";
import useImage from "use-image";

import userImage from "./UI-Lovecraft.jpg";

const USER_IMAGE_LAYER = {
  width: 624,
  height: 591
};

const App = () => {
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);
  const [stage, setStage] = useState({
    scale: 1,
    x: 0,
    y: 0
  });

  const [isDragging, setIsDragging] = useState(false);
  const [image] = useImage(userImage);
  // const [image] = useImage('https://konvajs.org/assets/lion.png');

  const onDragStart = () => setIsDragging(true);
  const onDragEnd = (e) => {
    setIsDragging(true);
    setX(e.target.x());
    setY(e.target.y());
    // console.log({ x: e.target.x(), y: e.target.y(), })
    console.log(stage.scale);
    // console.log(e.target.width())
  };
  // console.log(image.width)

  const handleWheel = (e) => {
    e.evt.preventDefault();

    const scaleBy = 1.02;
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

  return (
    <Stage
      width={USER_IMAGE_LAYER.width}
      height={USER_IMAGE_LAYER.width}
      onWheel={handleWheel}
      scaleX={stage.scale}
      scaleY={stage.scale}
      x={stage.x}
      y={stage.y}
    >
      <Layer>
        {/* <Text
          text="Draggable Text"
          x={x}
          y={y}
          draggable
          fill={isDragging ? 'green' : 'black'}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        /> */}
        <Image
          image={image}
          x={x}
          y={y}
          draggable
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        />
      </Layer>
    </Stage>
  );
};

render(<App />, document.getElementById("root"));
