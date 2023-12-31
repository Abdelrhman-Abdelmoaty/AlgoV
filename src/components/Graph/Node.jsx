import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
export default function Node({ node, setNodes, setEdges, activeEdge, setActiveEdge }) {
  const [circle, setCircle] = useState({ cx: node.x, cy: node.y, radius: 30 });
  const strokeWidth = 2;
  const svgGroupElemRef = useRef(null);

  const startDrag = useCallback(
    (event) => {
      event.preventDefault();

      const svgRect = svgGroupElemRef.current.getBoundingClientRect();

      const initialMouseX = event.clientX;
      const initialMouseY = event.clientY;

      const initialCircleX = circle.cx;
      const initialCircleY = circle.cy;

      const mousemove = (event) => {
        event.preventDefault();

        const newCircleX = event.clientX - initialMouseX + initialCircleX;
        const newCircleY = event.clientY - initialMouseY + initialCircleY;

        setCircle((prevCircle) => ({
          ...prevCircle,
          cx: newCircleX,
          cy: newCircleY,
        }));
        setNodes((prev) => {
          return prev.map((n) => {
            if (n.id === node.id) {
              return { ...node, x: newCircleX, y: newCircleY };
            } else return n;
          });
        });
      };

      const mouseup = () => {
        document.removeEventListener("mouseup", mouseup);
        document.removeEventListener("mousemove", mousemove);
      };

      document.addEventListener("mousemove", mousemove);
      document.addEventListener("mouseup", mouseup);
    },
    [circle]
  );
  return (
    <motion.g
      initial={{ x: 10 }}
      animate={{ x: 0 }}
      ref={svgGroupElemRef}
      onMouseDown={startDrag}
      cursor="pointer"
      onDoubleClick={(e) => {
        if (activeEdge.src === null) {
          setActiveEdge({ src: node.id, dest: null });
        }
      }}
      onClick={() => {
        if (activeEdge.src && activeEdge.src !== node.id && activeEdge.dest === null) {
          setActiveEdge({ src: null, dest: null });
          setEdges((prev) => [...prev, { src: activeEdge.src, dest: node.id }]);
        }
      }}
    >
      <circle cx={circle.cx} cy={circle.cy} r={circle.radius} style={{ fill: node.color, stroke: node.borderColor, strokeWidth }} className="flex items-center justify-center" />
      <text x={circle.cx} y={circle.cy + 6} textAnchor="middle" alignmentBaseline="middle" fontSize="20" fontWeight="bold">
        {node.value}
      </text>
    </motion.g>
  );
}
