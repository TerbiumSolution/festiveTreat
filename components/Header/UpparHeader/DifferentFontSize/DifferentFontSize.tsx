"use client";
import React, { useState, useEffect } from "react";
import styles from "@/components/Header/UpparHeader/DifferentFontSize/DifferentFontSize.module.css";
import { useFontSize } from "@/context/FontSizeContext"
export default function DifferentFontSize() {
  const { scale, setScaleDirectly } = useFontSize();
  const [activeScale, setActiveScale] = useState(scale);

  useEffect(() => {
    setActiveScale(scale); // sync when context updates
  }, [scale]);

  const handleClick = (value: number) => {
    setScaleDirectly(value);  // updates global state
    setActiveScale(value);    // immediate visual feedback
  };
  return (
    <>
        <span role="button" onClick={() => handleClick(-2)} className={`${styles.font_wrapper} ${activeScale === -2 ? "active" : ""}`}>A-</span>
        <span role="button" onClick={() => handleClick(0)} className={`${styles.font_wrapper} ${activeScale === 0 ? "active" : ""}`}>A</span>
        <span role="button" onClick={() => handleClick(2)} className={`${styles.font_wrapper} ${activeScale === 2 ? "active" : ""}`}>A+</span>   
    </>
  );
}