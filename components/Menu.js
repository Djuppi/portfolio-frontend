import { useState } from 'react';
import { motion } from 'framer-motion';

export const Menu =({
isOpen = false,
  width = 30,
  height = 30,
  strokeWidth = 1,
  color = '#732e24',
  transition = null,
  lineProps = null,
}, props) => {

    const variant = isOpen ? "opened" : "closed";

    const top = {
        closed: {
          rotate: 0,
          translateY: 0
        },
        opened: {
          rotate: 45,
          translateY: 2
        }
      };
      const center = {
        closed: {
          opacity: 1
        },
        opened: {
          opacity: 0
        }
      };
      const bottom = {
        closed: {
          rotate: 0,
          translateY: 0
        },
        opened: {
          rotate: -45,
          translateY: -2
        }
      };


    lineProps = {
        stroke: color,
        strokeWidth: strokeWidth,
        vectorEffect: "non-scaling-stroke",
        initial: "closed",
        lineHeight: 0.5,
        animate: variant,
        transition,
        ...lineProps
      };

      const buttonStyle = {
        display: "flex",
        "justify-self": "flex-end",
        "grid-column": "3",
        "align-self": "flex-start",
        cursor: "pointer"
      }

    const unitHeight = 4;
    const unitWidth = (unitHeight * (width)) / (height);
  return (
    <motion.svg
        viewBox={`0 0 ${unitWidth} ${unitHeight}`}
        overflow="visible"
        preserveAspectRatio="none"
        width={width}
        height={height}
        style={buttonStyle}
        {...props}
    >
        <motion.line
            x1="0"
            x2={unitWidth}
            y1="0"
            y2="0"
            variants={top}
            {...lineProps}
        />
        <motion.line
            x1="0"
            x2={unitWidth}
            y1="2"
            y2="2"
            variants={center}
            {...lineProps}
        />
        <motion.line
            x1="0"
            x2={unitWidth}
            y1="4"
            y2="4"
            variants={bottom}
            {...lineProps}
        />

    </motion.svg>
  )
}
