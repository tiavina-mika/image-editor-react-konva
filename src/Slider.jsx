/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "@emotion/react";
import { useTheme } from "@emotion/react";
import { Slider as AntdSlider } from "antd";
import PropTypes from "prop-types";

const SLIDER = {
  width: 340,
  height: 14,
  borderRadius: 16
};

const classes = {
  slider: (defaultTheme) => ({
    width: SLIDER.width,
    "&:hover .ant-slider-track": {
      background: defaultTheme.colors.primaryLight
    },
    "& .ant-slider-track": {
      width: SLIDER.width,
      height: SLIDER.height,
      background: defaultTheme.colors.primaryLight,
      borderRadius: SLIDER.borderRadius
    },
    "& .ant-slider-rail": {
      width: SLIDER.width,
      height: SLIDER.height,
      borderRadius: SLIDER.borderRadius
    }
  }),
  rail: (theme) => ({
    background: theme.colors.primary,
    marginTop: -40 / 3,
    border: "none",
    height: 40,
    width: 40
  })
};

const Slider = ({
  onChange,
  value,
  min,
  max,
  formatter,
  step = 1,
  defaultValue,
  ...props
}) => {
  const theme = useTheme();
  return (
    // ISSUES: https://github.com/ant-design/ant-design/issues/26136
    <AntdSlider
      css={classes.slider}
      handleStyle={classes.rail(theme)}
      tipFormatter={formatter}
      min={min}
      max={max}
      step={step}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

Slider.propTypes = {
  onChange: PropTypes.func,
  formatter: PropTypes.func,
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number
};

export default Slider;
