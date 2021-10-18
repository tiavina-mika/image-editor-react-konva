import React, { useCallback, useEffect, useRef, useState } from "react";
import { render } from "react-dom";
import { Stage, Layer, Text, Image, Group } from "react-konva";
import useImage from "use-image";

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

const App = () => {
  const imageRef = React.useRef();
  let ui;
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [stage, setStage] = useState({
    scale: 1,
    x: 0,
    y: 0
  });
  const [isDragging, setIsDragging] = useState(false);
  // const [image] = useImage(userImage);
  const [image, setImage] = useState(null);

  const [mask] = useImage(imageMask);
  // const [image] = useImage('https://konvajs.org/assets/lion.png');

  const handleLoad = useCallback(() => {
    setImage(imageRef.current);
  }, []);

  useEffect(() => {
    const img = new window.Image();
    img.src = userImage;
    // img.crossOrigin="Anonymous";
    imageRef.current = img;
    imageRef.current.addEventListener("load", handleLoad);

    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener("load", handleLoad);
      }
    };
  }, [handleLoad]);

  // console.log('image', imageRef.current)
  const sceneFunc = (ctx) => {
    // console.log('imageref', imageRef.current?.x)
    if (!image) return;
    ctx.drawImage(image, 0, 0, USER_IMAGE_LAYER.width, USER_IMAGE_LAYER.height);
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(mask, 0, 0, MASK_LAYER.width, MASK_LAYER.height);
    // ctx.drawImage(mask, -imageRef.current?.x, -imageRef.current.y);
  };

  const hitFunc = (ctx) => {
    ctx.rect(0, 0, 200, 200);
    if (!image) return;
    // ctx.drawImage(image, 0, 0);

    // ctx.fillStrokeShape(image);
  };
  // useEffect(() => {
  //   if (image) {
  //     console.log('image', imageRef.current.width());
  //   }
  // }, [image]);

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
      height={USER_IMAGE_LAYER.height}
      onWheel={handleWheel}
      scaleX={stage.scale}
      scaleY={stage.scale}
      x={stage.x}
      y={stage.y}
    >
      <Layer>
        {/* <Group> */}
        <Image
          image={image}
          x={x}
          y={y}
          draggable
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          ref={imageRef}
          sceneFunc={sceneFunc}
          hitFunc={hitFunc}
          // width={USER_IMAGE_LAYER.width}
          // hight={USER_IMAGE_LAYER.hight}
        />
        {/* </Group>
        <Group
          globalCompositeOperation="destination-in"
          // globalCompositeOperation="lighter"
        >
          <Image
            image={mask}
            x={x}
            y={y}
            width={MASK_LAYER.width}
            height={MASK_LAYER.height}
          />
        </Group> */}
      </Layer>
    </Stage>
  );
};

render(<App />, document.getElementById("root"));
